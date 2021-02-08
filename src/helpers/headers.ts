import { isPlainObj } from './objs'

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

const normalizeHeaderName = (headers: { [key in string]: string }): { [key in string]: string } => {
  if (!headers) return {}
  const keys = Object.keys(headers)
  if (keys.length === 0) return {}

  return Object.keys(headers).reduce((obj, k) => {
    const val = headers[k]
    const key = k.toLowerCase()
    return { ...obj, [key]: val }
  }, {})
}
