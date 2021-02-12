import { AxiosInterceptorManager, RejectFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn
}

export default class InterceptorManager<T> implements AxiosInterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number) {
    this.interceptors[id] && (this.interceptors[id] = null)
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach(el => el && fn.call(null, el))
  }
}
