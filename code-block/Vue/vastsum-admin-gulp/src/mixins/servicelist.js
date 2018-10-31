// import {
//   getServiceListApi
// } from '@/api/common'

export default {
  data() {
    return {
      serviceList: []
    }
  },
  created() {
    this.getServiceList()
  },
  methods: {
    getServiceList() {
      // getServiceListApi().then(res => {
      //   this.serviceList = res.data.map(item => {
      //     return {
      //       label: item.userName,
      //       value: item.userId
      //     }
      //   })
      // })
    }
  }
}
