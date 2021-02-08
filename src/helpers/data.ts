import { isPlainObj } from './objs'

export function transformRequest(data: any): any {
  //xhr support branch of datas.but with regular data we need stringify
  return isPlainObj(data) ? JSON.stringify(data) : data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {}
  }
  return data
}
