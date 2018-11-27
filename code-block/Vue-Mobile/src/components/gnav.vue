<template>
  <van-nav-bar left-arrow @click-left="onClickLeft" left-text="返回列表" title="微型植物工厂" /> 
</template>
<script>
export default {
  name: 'Gnav',
  methods: {
    onClickLeft() {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped lang="less">
</style>
