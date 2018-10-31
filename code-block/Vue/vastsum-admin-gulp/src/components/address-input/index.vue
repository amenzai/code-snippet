<template>
  <el-cascader @change="handleChangeRegion" v-model="region" clearable :options="address" placeholder="请选择"></el-cascader>
</template>
<script>
import address from '@/utils/address';
export default {
  name: 'AddressInput',
  props: {
    initial: Array
  },
  watch: {
    initial() {
      this.region = this.initial
    }
  },
  data() {
    return {
      region: [],
      address: address
    }
  },
  created() {
    this.region = this.initial
  },
  methods: {
    handleChangeRegion(val) {
      this.$emit('input', val)
    }
  }
}
</script>
