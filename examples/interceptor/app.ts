import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptors.response.use(res => {
  res.data += 'abc'
  return res
})

axios.interceptors.response.use(res => {
  res.data += 'barney'
  return res
})

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => console.log(res))
