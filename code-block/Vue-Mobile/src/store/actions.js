import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {userInfo, index}) {
  commit(types.UPDATE_USER, userInfo)
}

