import {
  AxiosPromise,
  AxiosRequestConfig,
  Axios,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectFn
} from '../types'
import InterceptorManager from './InterceptorManager'
import dispatch from './dispatcher'
import mergeConfig from '../helpers/mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class AxiosImpl implements Axios {
  public interceptors: Interceptors
  public defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(urlorConfig: any, config?: any): AxiosPromise {
    if (typeof urlorConfig === 'string') {
      if (!config) config = {}
      config.url = urlorConfig
    } else {
      config = urlorConfig
    }

    config = mergeConfig(this.defaults, config)
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatch,
        rejected: undefined
      }
    ]

    // config -> request interceptor -> ...... -> dispatch ->
    // response -> response interceptor -> ...... -> handle response

    //stack
    this.interceptors.request.forEach(interceptor => chain.unshift(interceptor))

    //queue
    this.interceptors.response.forEach(interceptor => chain.push(interceptor))

    let currentResolved = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      currentResolved = currentResolved.then(resolved, rejected)
    }

    return currentResolved
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
