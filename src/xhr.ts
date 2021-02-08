import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaderStr } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config

    const req = new XMLHttpRequest()

    req.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(key => req.setRequestHeader(key, headers[key]))

    if (responseType) req.responseType = responseType

    req.send(data)

    req.onreadystatechange = function handleLoad() {
      if (req.readyState !== 4) return

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
      resolve(response)
    }
  })
}
