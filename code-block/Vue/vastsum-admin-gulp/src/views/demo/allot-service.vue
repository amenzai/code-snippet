<template>
  <el-dialog title="分配客服" :close-on-click-modal="false" :visible.sync="visible" width="40%">
    <el-alert title="" type="info" class="mb20" :closable="false" show-icon>
      <span>1、如果当前有客服，分配客服后，将变更客服</span><br>
      <span>2、如果当前无客服，将分配您选择的客服</span>
    </el-alert>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="选择客服：" prop="id">
        <el-select clearable v-model="dataForm.id" placeholder="请选择">
          <el-option :label="item.label" :value="item.value + ''" :key="item.value" v-for="item in serviceList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <p>如未设置客服账号，请先行<el-button type="text" @click="$router.push({name: 'setting-staff'})">设置客服账号</el-button></p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="visible = false">取消</el-button> -->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { assignServiceApi } from '@/api/customer.js'
import getServiceListMixin from '@/mixins/servicelist'
export default {
  mixins: [getServiceListMixin],
  props: ['userIds'],
  data() {
    return {
      visible: false,
      dataForm: {
        id: ''
      },
      dataRule: {
        id: [{ required: true, message: '不能为空', trigger: 'change' }]
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
          // assignServiceApi({
          //   serviceUserId: this.dataForm.id,
          //   ids: this.userIds.split(',')
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
