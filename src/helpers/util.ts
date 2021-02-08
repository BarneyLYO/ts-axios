const protoToStr = Object.prototype.toString

export const isDate = (val: any): val is Date => !!val && protoToStr.call(val) === '[object Date]'

// export const isObj = (val: any): val is object => val !== null && typeof val === 'object'

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
