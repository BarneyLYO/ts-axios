const protoToStr = Object.prototype.toString

export const getTag = <T>(val: T): string => {
  if (val === null) return val === undefined ? '[object Undefined]' : '[object Null]'
  return protoToStr.call(val)
}

export const isLikeObj = (val: any): val is object => typeof val === 'object' && val !== null

export const isPlainObj = (val: any): boolean => {
  if (!isLikeObj(val) || getTag(val) !== '[object Object]') return false

  if (Object.getPrototypeOf(val) === null) return true

  let proto = val
  while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto)

  return Object.getPrototypeOf(val) === proto
}
