module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx'],
        alias: {
          utils: './src/utils'
        }
      }
    ]
  ]
}
