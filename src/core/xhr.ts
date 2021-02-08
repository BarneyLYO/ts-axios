import { createError } from '../helpers/error'
import { parseHeaderStr } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config

    const req = new XMLHttpRequest()

    req.open(method.toUpperCase(), url!, true)
    Object.keys(headers).forEach(key => req.setRequestHeader(key, headers[key]))

    if (responseType) req.responseType = responseType

    if (timeout) req.timeout = timeout

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
      if (res.status >= 200 && res.status < 300) return resolve(res)
      return reject(
        createError(`Request failed with status code ${res.status}`, config, null, req, res)
      )
    }
  })
}
