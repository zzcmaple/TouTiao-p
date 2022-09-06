const pxToRem = require('postcss-pxtorem')

module.exports = {
  plugins: [
    pxToRem({
      rootValue({ file }) {
        return /vant/.test(file) ? 37.5 : 75
      },
      propList: ['*']
    })
  ]
}
