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

app.use(router)

const port = process.env.PORT || 8888
module.exports = app.listen(port, () => {
  console.log('port: ', port)
})
