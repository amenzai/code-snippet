import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 开发时打开，外部修改 state 会警告
    state: defaultState,
    mutations,
    getters,
    actions
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]
    // modules: {
    //   a: {
    //     namespaced: true, // 声明命名空间 使得mutations在自己模块下
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) { // 定义： ...mapMutations(['a/updateText']), 调用：this['a/updateText'](123)
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: { // 定义：...mapGetters(['a/textPlus']), 调用：this['a/textPlus']；模板中使用，这样写 ...mapGetters({textPlus: 'a/textPlus'})
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', { num: 56789 }, { root: true }) // { root: true }配置可以让我们到全局找 mutations
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
