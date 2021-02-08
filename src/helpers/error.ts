import { AxiosError, AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosErrorImp extends Error implements AxiosError {
  readonly isAxiosError = true
  config: AxiosRequestConfig
  code?: string | null
  request?: any //html http request
  response?: AxiosResponse

  constructor(config: AxiosRequestConfig, message: string) {
    super(message)
    this.config = config

    Object.setPrototypeOf(this, AxiosErrorImp.prototype)
  }
}

export function createError(
  msg: string,
  config: AxiosRequestConfig,
  code?: string | null,
  req?: any,
  res?: AxiosResponse
) {
  const err = new AxiosErrorImp(config, msg)
  err.code = code
  err.request = req
  err.response = res
  return err
}
