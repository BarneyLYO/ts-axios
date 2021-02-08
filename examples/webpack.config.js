const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const fileExists = (parentFolder, absPath) =>
  fs.statSync(parentFolder).isDirectory() && fs.existsSync(absPath)

const entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
  const fullDir = path.join(__dirname, dir)
  const entry = path.join(fullDir, 'app.ts')
  fileExists(fullDir, entry) && (entries[dir] = ['webpack-hot-middleware/client', entry])
  return entries
}, {})

console.log(entry)

const output = {
  path: path.join(__dirname, '__build__'),
  filename: '[name].js',
  publicPath: '/__build__/'
}

const loaders = [
  {
    test: /\.ts$/,
    enforce: 'pre',
    use: [
      {
        loader: 'tslint-loader'
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  {
    test: /.\tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
]

const resolve = {
  extensions: ['.ts', '.tsx', '.js']
}

const plugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]

module.exports = {
  mode: 'development',
  entry,
  output,
  module: {
    rules: loaders
  },
  resolve,
  plugins
}
