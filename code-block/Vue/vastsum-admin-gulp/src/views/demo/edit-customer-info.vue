<template>
  <el-dialog title="编辑客户信息" :close-on-click-modal="false" :visible.sync="visible" width="70%">
    <el-form :model="customerInfo" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="公司名：">
            <el-input v-model="customerInfo.companyName" placeholder="请输入公司名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{ customerInfo.mobile }}</span>
          </el-form-item>
          <el-form-item label="联系QQ：">
            <el-input v-model="customerInfo.qq" placeholder="请输入联系QQ"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：">
            <address-input :initial="customerInfo.areaArr" @input="getRegionArr"></address-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="域名：">
            <el-input v-model="customerInfo.domain" placeholder="请输入域名"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model="customerInfo.linkman" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="customerInfo.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="联系地址：">
            <el-input v-model="customerInfo.address" placeholder="请输入联系地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="visible = false">取消</el-button> -->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { updateCustomerInfo } from '@/api/customer'
import AddressInput from '@/components/address-input'
export default {
  props: {
    customerInfo: Object
  },
  components: {
    AddressInput
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    getRegionArr(val) {
      if (val) {
        if (val.length > 1) {
          this.customerInfo.areaCode = val[1]
        } else {
          this.customerInfo.areaCode = val[0]
        }
      } else {
        this.customerInfo.areaCode = ''
      }
    },
    // 表单提交
    dataFormSubmit() {
      delete this.customerInfo.areaArr
      // updateCustomerInfo(this.customerInfo.id, this.customerInfo).then(res => {
      //   this.$message({
      //     message: '操作成功',
      //     type: 'success',
      //     duration: 1500,
      //     onClose: () => {
      //       this.visible = false
      //       this.$emit('refreshDataList')
      //     }
      //   })
      // })
    }
  }
}
</script>
