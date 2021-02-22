import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helps:error', () => {
  test('should create an Error with Message, config, code,etc', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const resp: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: { a: '1' },
      request,
      config,
      data: { foo: 'bar' }
    }

    const error = createError('Boom!', config, 'lalal', request, resp)
    expect(error instanceof Error).toBeTruthy()
  })
})
