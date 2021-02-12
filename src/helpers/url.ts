import { isDate } from './util'
import { PlainStrKeyOnlyObj } from '../types'
import { isPlainObj } from './objs'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildURL = (url: string, params?: null | PlainStrKeyOnlyObj): string =>
  !params ? url : serializeUrl(url, formParts(params))

const formParts = (params: PlainStrKeyOnlyObj): string[] => {
  const parts: string[] = []

  Object.keys(params)
    .filter(key => !!params[key])
    .forEach(key => {
      const val = params[key]
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val => {
        if (isDate(val)) val = val.toISOString()
        else if (isPlainObj(val)) val = JSON.stringify(val)

        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
  return parts
}

const serializeUrl = (url: string, parametersParts: string[]): string => {
  if (!parametersParts || parametersParts.length === 0) return url

  const serialized = parametersParts.join('&')

  const hashIndex = url.indexOf('#')
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex)
  }

  url += (url.indexOf('?') === -1 ? '?' : '&') + serialized

  return url
}
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string) {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return { protocol, host }
}

export const isAbsURL = (url: string): boolean => /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
export const combineURL = (baseURL: string, relativeURL?: string): string =>
  relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL

export const isURLSameOrigin = (requestURL: string): boolean => {
  const origin = resolveURL(requestURL)
  return origin.protocol === currentOrigin.protocol && origin.host === currentOrigin.host
}
