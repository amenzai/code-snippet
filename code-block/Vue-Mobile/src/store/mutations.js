import * as types from './mutation-types'
import storage from 'good-storage'

const mutations = {
  // 重置vuex本地储存状态
  resetStore (state) {
    state.userInfo = {}
  },
  [types.UPDATE_LOADING](state, status) {
    state.loading = status
  },
  [types.UPDATE_USER](state, userInfo) {
    state.userInfo = userInfo
    storage
      .session
      .set(USER_INFO, userInfo)
  }
}

export default mutations