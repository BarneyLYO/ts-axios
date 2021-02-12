import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types'

const defaultsConfig: AxiosRequestConfig = {
  method: 'get',
  timeout: 0
}

const defaultsHeader: { [key in string]: unknown } = {
  common: {
    Accept: 'application/json, text/plain,*/*'
  },
  adasdadasd: 'asd'
}

const methodNoData = ['delete', 'get', 'head', 'options']
methodNoData.forEach(mth => (defaultsHeader[mth] = {}))

const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(
  mth =>
    (defaultsHeader[mth] = {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
)

defaultsConfig.headers = defaultsHeader

defaultsConfig.transformRequest = [
  function(data: any, headers: any): any {
    return transformRequest(processHeaders(headers, data))
  }
]

defaultsConfig.transformResponse = [
  function(data: any): any {
    return transformResponse(data)
  }
]

defaultsConfig.xsrfCookieName = 'XSRF-TOKEN'

defaultsConfig.xsrfHeaderName = 'X-XSRF-TOEKN'

export default defaultsConfig
