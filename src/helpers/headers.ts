import { Method } from '../types'
import { isPlainObj } from './objs'
import { deepMerge } from './util'

export function processHeaders(headers: { [key in string]: string }, data: any) {
  const processed = normalizeHeaderName(headers)
  const isdataObj = isPlainObj(data) && processed && !processed['content-type']
  if (isdataObj) {
    processed['content-type'] = 'application/json;charset=utf-8'
  }
  return processed
}

export function parseHeaderStr(headerStr: string): { [key in string]: string } {
  return headerStr.split('\r\n').reduce((obj, line) => {
    let [k, v] = line.split(':')

    k = k.trim().toLowerCase()
    if (!k || k === '') return obj
    if (v) v = v.trim()

    return { ...obj, [k]: v }
  }, {})
}

const normalizeHeaderName = (headers: { [key in string]: any }): { [key in string]: any } => {
  if (!headers) return {}
  const keys = Object.keys(headers)
  if (keys.length === 0) return {}

  return Object.keys(headers).reduce((obj, k) => {
    const val = headers[k]
    const key = k.toLowerCase()
    return { ...obj, [key]: val }
  }, {})
}

export const flattenHeaders = (headers: any, method: Method) => {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)
  headers = Object.keys(headers)
    .filter(k => typeof headers[k] === 'string' || typeof headers[k] === 'number')
    .reduce((obj, curr) => ({ ...obj, [curr]: headers[curr] }), {})
  return headers
}
