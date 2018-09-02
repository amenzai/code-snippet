require.include('./moduleA')
const page = 'subPageA'
// if (page === 'subPageA') {
//   require.ensure([], function () {
//     var subPageA = require('./subPageA')
//   }, 'subPageA')
// } else if (page === 'subPageB') {
//   require.ensure([], function () {
//     var subPageA = require('./subPageB')
//   }, 'subPageB')
  
// }
if (page === 'subPageA') {
  import(/* webpackChunkName: 'subPageA' */'./subPageA').then(function(subpageA) {
    console.log(subPageA);
  })
} else if (page === 'subPageB') {
  import(/* webpackChunkName: 'subPageB' */'./subPageB').then(function(subPageB) {
    console.log(subPageB);
  })
  
}

require.ensure([], function () {
  var _ = require('lodash')
  _.join(['1', '2'], '3')
}, 'vendor')

export default 'pageA'