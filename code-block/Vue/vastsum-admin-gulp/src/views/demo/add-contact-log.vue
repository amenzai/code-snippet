<template>
  <el-dialog title="添加联系日志" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="下次联系时间：" prop="nextContactTime">
        <el-date-picker v-model="dataForm.nextContactTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="联系内容：" prop="body">
        <el-input v-model="dataForm.body" type="textarea" :rows="6" placeholder="请输入联系内容">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="visible = false">取消</el-button> -->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { testApi } form '@/api/'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        nextContactTime: '',
        body: ''
      },
      dataRule: {
        body: [{
          min: 10,
          max: 1000,
          message: '请输入10~1000字符'
        }],
        nextContactTime: [{
          type: 'date',
          required: true,
          message: '请选择下次联系时间',
          trigger: 'change'
        }]
      },
      pickerOptions: {
        disabledDate(time) {
          var end = new Date();
          end.setDate(end.getDate() + 15);
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() > end
        }
      }
    }
  },
  methods: {
    init() {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 15);
      this.dataForm.nextContactTime = this.$dateFilter(defaultDate)
      // this.dataForm.nextContactTime = defaultDate
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.dataForm);
      this.$refs['dataForm'].validate(valid => {
        // if (valid) {
        //   testApi({
        //     status: this.dataForm.status
        //   }).then(res => {
        //     this.$message({
        //       message: '操作成功',
        //       type: 'success',
        //       duration: 1500,
        //       onClose: () => {
        //         this.visible = false
        //         this.$emit('refreshDataList')
        //       }
        //     })
        //   })
        // }
      })
    }
  }
}
</script>
