import AxiosImpl from './core/Axios'
import { extend } from './helpers/util'
import { AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './helpers/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new AxiosImpl(config)
  const instance = AxiosImpl.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
