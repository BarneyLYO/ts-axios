import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import { buildURL, combineURL, isAbsURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import transform from './transform'
import xhr from './xhr'

function dispatch(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(transformResData)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.headers = flattenHeaders(config.headers, config.method!)
  config.data = transformReqData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  let { url, params, baseURL } = config
  if (baseURL && !isAbsURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params)
}

function transformReqData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  return processHeaders(config.headers || {}, config.data)
}

function transformResData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  //res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default dispatch
