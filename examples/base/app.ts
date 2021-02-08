import axios from '../../src/index'

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

axios({
  method: 'post',
  url: '/base/buffer',
  data: new Int32Array([1, 2, 3, 4, 5])
}).then(res => {
  console.log('llll', res)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    accept: 'application/json, text/plain, */*'
  },
  responseType: 'json', //auto parser
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log('res', res))

axios({
  method: 'post',
  url: '/base/post',
  //form data application/x-www-form-urlencoded;charset=UTF-8
  data: new URLSearchParams('q=URLUtils.searchParams&topic=api')
})
