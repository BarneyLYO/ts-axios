const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const router = express.Router()

const app = express()

const compiler = webpack(webpackConfig)

app.use(
  webpackDevMiddleWare(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleWare(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => res.json(req.body))

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => chunk && msg.push(chunk))

  req.on('end', () => res.json(Buffer.concat(msg).toJSON()))
})

router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) return res.json({ msg: 'lalalalla' })
  res.status(500)
  return res.end()
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => res.json({ msg: 'timeout' }), 10000)
})

registerExtendRouter()

app.use(router)

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

const port = process.env.PORT || 8888
module.exports = app.listen(port, () => {
  console.log('port: ', port)
})
