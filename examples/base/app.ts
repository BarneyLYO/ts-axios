import qs from 'qs'
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
axios.defaults.headers.common['asdasdasd'] = '31312313131'
axios.defaults.headers['bbbbb'] = 12345
axios({
  method: 'post',
  url: '/base/post',
  // headers: {
  //   'content-type': 'application/json',
  //   accept: 'application/json, text/plain, */*'
  // },
  responseType: 'json', //auto parser
  data: qs.stringify({
    //submit as form data
    a: 1,
    b: 2
  })
}).then(res => console.log('res', res))

axios({
  method: 'post',
  url: '/base/post',
  //form data application/x-www-form-urlencoded;charset=UTF-8
  data: new URLSearchParams('q=URLUtils.searchParams&topic=api')
})

interface User {
  name: string
  age: number
}

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(console.error)
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user)
  }
}

test()
