import { Canceler, CancelExecutor, CancelToken } from '../types'

interface ResolvePromise {
  (reason: string): void
}

export default class CancelTokenImple implements CancelToken {
  promise: Promise<string>
  reason?: string

  static source() {
    let cancel!: Canceler
    const token = new CancelTokenImple(c => (cancel = c))

    return {
      cancel,
      token
    }
  }

  constructor(executor: CancelExecutor) {
    // cancel => {}
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })
    executor(msg => {
      if (this.reason) return

      this.reason = msg
      resolvePromise(this.reason || '')
    })
  }
}
