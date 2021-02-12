import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaderStr } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      xsrfCookieName,
      xsrfHeaderName,
      onUploadProgress,
      onDownloadProgress,
      auth
    } = config

    const req = new XMLHttpRequest()

    req.open(method.toUpperCase(), url!, true)
    Object.keys(headers).forEach(key => req.setRequestHeader(key, headers[key]))

    if (responseType) req.responseType = responseType

    if (timeout) req.timeout = timeout

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        req.abort()
        reject(reason)
      })
    }

    req.withCredentials = !!config.withCredentials

    if ((req.withCredentials || isURLSameOrigin(url!)) && xsrfCookieName && xsrfHeaderName) {
      const xsrfV = cookie.read(xsrfCookieName)
      xsrfV && (headers[xsrfHeaderName] = xsrfV)
    }

    if (onDownloadProgress) {
      req.onprogress = onDownloadProgress
    }

    if (onUploadProgress) {
      req.upload.onprogress = onUploadProgress
    }

    if (isFormData(data)) {
      delete headers['content-type'] //让阅览器自己判断上传的文件类型
    }

    if (auth) {
      headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
    }

    req.send(data)

    req.onreadystatechange = function handleLoad() {
      if (req.readyState !== 4) return

      if (req.status === 0) return

      const resHeader = req.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? req.response : req.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: req.status,
        statusText: req.statusText,
        headers: parseHeaderStr(resHeader),
        config,
        request: req
      }
      handleRes(response)
    }

    req.onerror = function handleError() {
      reject(createError(`Network Error`, config, null, req))
    }

    req.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceed`, config, 'ECONNABORTED', req))
    }

    function handleRes(res: AxiosResponse): void {
      let failed = false
      if (!res.config?.validateStatus || typeof res.config.validateStatus !== 'function') {
        if (res.status >= 200 && res.status < 300) return resolve(res)
        failed = true
      } else if (!res.config.validateStatus(res.status)) {
        failed = true
      }
      if (failed) {
        reject(createError(`Request failed with status code ${res.status}`, config, null, req, res))
      }
    }
  })
}
