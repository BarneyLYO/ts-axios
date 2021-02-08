const protoToStr = Object.prototype.toString

export const isDate = (val: any): val is Date => !!val && protoToStr.call(val) === '[object Date]'

// export const isObj = (val: any): val is object => val !== null && typeof val === 'object'
