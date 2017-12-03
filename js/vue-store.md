vuex的简单实用

## 代码示例
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward'
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    }
  }
})
```

## 使用方法
```js
// 实例中调用

// 更新值
this.$store.commit('UPDATE_LOADING', true);
// 获取值
this.$store.state.isLoading;
```