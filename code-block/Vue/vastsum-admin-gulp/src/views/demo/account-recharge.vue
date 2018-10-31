<template>
  <el-dialog title="账户余额扣除" :close-on-click-modal="false" :visible.sync="visible" width="30%">
    <el-alert title="" type="info" class="mb20" :closable="false" show-icon>
      <span>给该客户充值前，请确保您已经收到相应款项</span>
    </el-alert>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="客户：">
        <span>{{ customerName }}</span>
      </el-form-item>
      <el-form-item label="充值金额：" prop="amount">
        <el-input v-model.number="dataForm.amount" placeholder="请输入金额"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { rechargeApi } from '@/api/customer'
export default {
  props: {
    id: {
      required: true
    },
    customerName: String
  },
  data() {
    return {
      visible: false,
      dataForm: {
        amount: ''
      },
      dataRule: {
        amount: [{ required: true, message: '不能为空' }, { type: 'number', message: '金额必须为数字值' }]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // rechargeApi(this.id, {
          //   amount: this.dataForm.amount
          // }).then(res => {
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
      })
    }
  }
}
</script>
