import { isDate, isFormData, extend, deepMerge } from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
  })

  describe('extends', () => {
    test('should be mutable', () => {
      const a = { foo: 123, bar: 2222 }
      const b = { bar: 888 }
      const c = extend(a, b)
      expect(c.foo).toBe(123)
      expect(c.bar).toBe(888)
    })
  })

  describe('deepmerge', () => {
    test('should be immutable', () => {
      const a: any = Object.create(null)
      const b: any = { foo: 1 }
      const c: any = { bar: 2 }
      deepMerge(a, b, c)
      expect(typeof a.foo).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })

    test('should deepMerge properties', () => {
      const a: any = Object.create(null)
      const b: any = { foo: 1, a: { c: 1 } }
      const c: any = { bar: 2, a: { a: 1 }, d: { a: 2 } }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(1)
      expect(d.bar).toBe(2)
      expect(d.d).not.toBe(c.d)
    })
  })
})
