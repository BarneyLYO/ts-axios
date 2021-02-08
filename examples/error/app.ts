import axios, { AxiosError } from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: [1, 2]
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       a: 1
//     }
//   }
// })

// const date = new Date()
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     aaa: '@:$,'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     b: null
//   }
// })
const ccc = res => console.log('ccc', res)
const eee = (err: AxiosError) => {
  const a = { ...err }
  console.log(a)
}

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(ccc)
  .catch(eee)

axios({
  method: 'get',
  url: '/error/get'
})
  .then(ccc)
  .catch(eee)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 1000
})
  .then(ccc)
  .catch(eee)

// simulate network error
setTimeout(
  () =>
    axios({
      method: 'get',
      url: '/error/get'
    })
      .then(ccc)
      .catch(eee),
  5000
)
