import { AxiosPromise, AxiosRequestConfig, Axios, Method } from '../types'
import dispatch from './dispatcher'

export default class AxiosImpl implements Axios {
  request(urlorConfig: any, config?: any): AxiosPromise {
    if (typeof urlorConfig === 'string') {
      if (!config) config = {}
      config.url = urlorConfig
    } else {
      config = urlorConfig
    }
    return dispatch(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('post', url, config, data)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('put', url, config, data)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod('patch', url, config, data)
  }

  private _requestMethod(
    method: Method,
    url: string,
    config: AxiosRequestConfig = {},
    data?: any
  ): AxiosPromise {
    return this.request(
      Object.assign(config, {
        method,
        url,
        data
      })
    )
  }
}
