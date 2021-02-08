import AxiosImpl from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new AxiosImpl()
  const instance = AxiosImpl.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

export default createInstance()
