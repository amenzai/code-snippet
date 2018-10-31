<template>
  <div>
    <el-form ref="form" :inline="true" :model="formSend" @keyup.enter.native="searchList">
      <el-form-item label="意向度：">
        <el-select clearable v-model="formSend.status" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in $getDicList('cultModel')"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="客服：">
        <el-select clearable v-model="formSend.serviceUserId" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in serviceList"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="注册日期：">
        <el-date-picker v-model="formDate" type="daterange" placeholder="选择日期范围" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="formSend.mobile" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="mb10" v-if="isAuth('user:customer:assign')">
      <el-button type="primary" @click="handleAllotService">分配客服</el-button>
    </div>
    <icon-svg name="ICAtubiao_yanzheng"></icon-svg>
    <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" @selection-change="selectionChangeHandle">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column label="手机号" header-align="center" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="{ path: '/demo-detail', query: {id: scope.row.id}}">{{ scope.row.mobile }}</router-link> -->
          <router-link :to="{ path: '/demo-detail', query: {id: 1}}">{{ scope.row.mobile }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="公司名" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.companyName }}</template>
      </el-table-column>
      <el-table-column label="余额" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.balance | currency }}</template>
      </el-table-column>
      <el-table-column label="客服" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.serviceUserName }}</template>
      </el-table-column>
      <el-table-column label="注册日期" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateFilter('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column label="最后登录时间" header-align="center" align="center">
        <template slot-scope="scope">{{ scope.row.lastActivityTime | dateFilter('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" header-align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="handleSetIntention(scope.row.id)">设置客户意向度</el-button> -->
          <!-- <el-button type="text" @click="$router.push({name: 'customer-contactrecord'})">查看联系记录</el-button> -->
          <el-button type="text" @click="handleAddLog">添加联系记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formSend.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="formSend.pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 分配客服 -->
    <allot-service ref="allotService" v-if="allotServiceVisible" @refreshDataList="getList" :user-ids="userIds"></allot-service>
    <!-- 添加联系日志 -->
    <add-contact-log ref="addContactLog" v-if="addContactLogVisible" @refreshDataList="getList"></add-contact-log>
  </div>
</template>
<script>
// import { getCustomerListApi } from '@/api/customer.js'
import getServiceListMixin from '@/mixins/servicelist'
import AddContactLog from './add-contact-log'
import AllotService from './allot-service'
export default {
  name: 'demo-list',
  components: {
    AllotService,
    AddContactLog
  },
  mixins: [getServiceListMixin],
  data() {
    return {
      userId: '',
      formSend: {
        company: '',
        mobile: '',
        status: '',
        serviceUserId: '',
        startDate: '',
        endDate: '',
        pageNo: 1,
        pageSize: 10
      },
      userIds: '',
      formDate: [],
      totalCount: 0,
      tableLoading: false,
      tableData: [{
        mobile: 123
      }],
      allotServiceVisible: false,
      addContactLogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // this.tableLoading = true
      // getCustomerListApi(this.formSend).then(res => {
      //   this.tableData = res.data
      //   this.totalCount = res.count
      //   this.tableLoading = false
      // }).catch(() => {
      //   this.tableLoading = false
      // })
    },
    searchList() {
      if (this.formDate && this.formDate.length) {
        this.formSend.startDate = this.formDate[0]
        this.formSend.endDate = this.formDate[1]
      } else {
        this.formSend.startDate = ''
        this.formSend.endDate = ''
      }
      this.formSend.pageNo = 1
      this.getList()
    },
    // 每页数
    handleSizeChange(val) {
      this.formSend.pageSize = val
      this.formSend.pageNo = 1
      this.getList()
    },
    // jump which page
    handleCurrentChange(val) {
      this.formSend.pageNo = val
      this.getList()
    },
    selectionChangeHandle(val) {
      this.userIds = val.map(item => item.id).toString()
    },
    handleAllotService() {
      if (!this.userIds) {
        this.$message.warning('请至少选择一个客户！')
        return
      }
      this.allotServiceVisible = true
      this.$nextTick(() => {
        this.$refs.allotService.init()
      })
    },
    handleAddLog() {
      this.addContactLogVisible = true
      this.$nextTick(() => {
        this.$refs.addContactLog.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

