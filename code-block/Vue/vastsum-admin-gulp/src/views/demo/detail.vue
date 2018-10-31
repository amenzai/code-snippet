<template>
  <div>
    <div class="detail-button-group">
      <el-button type="primary" @click="jumpTo">管理</el-button>
      <el-button @click="editCustomerInfo">编辑</el-button>
      <!-- <el-button @click="handleAddContactLog">添加联系记录</el-button> -->
      <!-- <el-button @click="handleAllotService" v-if="isAuth('user:customer:assign')">分配客服</el-button> -->
      <el-button @click="handleAllotService">分配客服</el-button>
      <el-button @click="handleRecharge">账户充值</el-button>
      <el-button @click="resetPass">密码重置</el-button>
      <!-- <el-button @click="handleSetIntention">意向度设置</el-button> -->
    </div>
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">账户信息</span>
        <el-button type="text" @click="editCustomerInfo">
          <i class="el-icon-edit"></i> 编辑</el-button>
      </div>
      <div class="panel-content clearfix">
        <el-col :span="9" :offset="3">
          <div class="label-value">
            <p class="label">客户编号：</p>
            <p class="value">12312312</p>
          </div>
          <div class="label-value">
            <p class="label">手机号：</p>
            <p class="value">157510055411</p>
          </div>
          <div class="label-value">
            <p class="label">地区：</p>
            <p class="value">{{customerInfo.areaCode | getAreaInfo }}</p>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="label-value">
            <p class="label">客户编号：</p>
            <p class="value">{{customerInfo.id}}</p>
          </div>
          <div class="label-value">
            <p class="label">手机号：</p>
            <p class="value">{{customerInfo.id}}</p>
          </div>
          <div class="label-value">
            <p class="label">地区：</p>
            <p class="value">{{customerInfo.areaCode | getAreaInfo }}</p>
          </div>
        </el-col>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">当前客服</span>
      </div>
      <div class="panel-content clearfix">
        <el-col :span="9" :offset="3">
          <div class="label-value">
            <p class="label">当前客服：</p>
            <p class="value">
              <span>{{customerInfo.serviceUserName}}</span>
              <el-button type="text" style="margin-left:20px;" @click="handleAllotService" v-if="isAuth('user:customer:assign')">分配客服</el-button>
            </p>
          </div>
        </el-col>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">客户站点</span>
        <el-button type="text" style="margin-left:20px;" @click="$router.push({name: 'customer-site'})">查看更多</el-button>
      </div>
      <div class="panel-content">
        <el-table :data="siteTableData" border style="width: 100%" v-loading="sitetableLoading">
          <el-table-column label="状态" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="域名" header-align="center" align="center">
            <template slot-scope="scope">
              <router-link :to="{ name: 'home'}">{{ scope.row.role }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="站点余额" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="搜索引擎" header-align="center" align="center" width="200">
            <template slot-scope="scope">
              <se-icon data="1,2,3,4,5,6,7"></se-icon>
            </template>
          </el-table-column>
          <el-table-column label="关键词数" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="发布时间" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.userPhone | dateFilter('YYYY-MM-DD') }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="panel">
      <div class="panel-head">
        <span class="panel-title">商户联系日志</span>
        <el-button type="text" style="margin-left:20px;" @click="handleAddContactLog">添加</el-button>
        <el-button type="text" style="margin-left:20px;" @click="$router.push({name: 'customer-contactrecord'})">查看更多</el-button>
      </div>
      <div class="panel-content">
        <el-table :data="logTableData" border style="width: 100%" v-loading="logTableLoading">
          <el-table-column label="联系时间" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="联系内容" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="添加人" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column label="下次联系时间" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.userPhone | dateFilter('YYYY-MM-DD') }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    <!-- 分配客服 -->
    <allot-service ref="allotService" v-if="allotServiceVisible" @refreshDataList="getCustomerInfo" :user-ids="userId"></allot-service>
    <!-- 添加联系日志 -->
    <add-contact-log ref="addContactLog" v-if="addContactLogVisible" @refreshDataList="getCustomerInfo"></add-contact-log>
    <!-- 编辑客户 -->
    <edit-customer-info ref="editCustomerInfo" v-if="editCustomerInfoVisible" @refreshDataList="getCustomerInfo" :customer-info="propCustomerInfo"></edit-customer-info>
    <!-- 账户充值 -->
    <account-recharge ref="accountRecharge" v-if="accountRechargeVisible" @refreshDataList="getCustomerInfo" :customer-name="customerInfo.companyName" :id="userId"></account-recharge>
  </div>
</template>

<script>
// import { getCustomerInfoApi, getCustomersiteApi, resetPwdApi } from '@/api/customer.js'
// import { jumpCustomerApi } from '@/api/common.js'
import AddContactLog from './add-contact-log'
import AllotService from './allot-service'
import EditCustomerInfo from './edit-customer-info'
import AccountRecharge from './account-recharge'
export default {
  name: 'demo-detail',
  components: {
    AllotService,
    AddContactLog,
    EditCustomerInfo,
    AccountRecharge
  },
  data() {
    return {
      userId: '',
      customerInfo: {},
      propCustomerInfo: {},
      siteFormSend: {
        pageNo: 1,
        pageSize: 5
      },
      siteTableData: [],
      sitetableLoading: false,
      logTableData: [],
      logTableLoading: false,
      allotServiceVisible: false,
      addContactLogVisible: false,
      editCustomerInfoVisible: false,
      accountRechargeVisible: false,
      accountInfo: {},
      customerSource: [
        {
          label: '前台注册',
          value: 0
        },
        {
          label: '后台录入',
          value: 1
        },
        {
          label: '手机端录入',
          value: 2
        }
      ]
    }
  },
  created() {
    this.userId = this.$route.query.id ? this.$route.query.id.toString() : ''
    console.log(typeof this.userId)
    this.getCustomerInfo()
    this.getSiteList()
  },
  methods: {
    getCustomerInfo() {
      // getCustomerInfoApi(this.userId).then(res => {
      //   this.customerInfo = res.data
      // })
    },
    getSiteList() {
      // this.sitetableLoading = true
      // getCustomersiteApi(this.siteFormSend).then(res => {
      //   this.siteTableData = res.data
      //   this.sitetableLoading = false
      // })
    },
    editCustomerInfo() {
      this.editCustomerInfoVisible = true
      this.propCustomerInfo = {
        id: this.userId,
        companyName: this.customerInfo.companyName,
        email: this.customerInfo.postcode,
        linkman: this.customerInfo.linkman,
        qq: this.customerInfo.qq,
        areaCode: this.customerInfo.areaCode,
        areaArr: this.$getAreaCodeArr(this.customerInfo.areaCode) || [],
        address: this.customerInfo.address,
        domain: this.customerInfo.domain,
        mobile: this.customerInfo.mobile
      }
      console.log(this.propCustomerInfo)
      this.$nextTick(() => {
        this.$refs.editCustomerInfo.init()
      })
    },
    handleAddContactLog() {
      this.addContactLogVisible = true
      this.$nextTick(() => {
        this.$refs.addContactLog.init()
      })
    },
    handleAllotService() {
      this.allotServiceVisible = true
      this.$nextTick(() => {
        this.$refs.allotService.init()
      })
    },
    handleRecharge() {
      this.accountRechargeVisible = true
      this.$nextTick(() => {
        this.$refs.accountRecharge.init()
      })
    },
    resetPass() {
      this.$confirm('确定要重置密码吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          // resetPwdApi(this.userId).then(res => {
          //   this.$alert('密码重置成功，新密码为：' + res.data, '消息提示', {
          //     confirmButtonText: '确定'
          //   })
          // })
        })
        .catch(() => {})
    },
    jumpTo() {
      // var tempWindow = window.open('about:blank');
      // jumpCustomerApi(this.userId).then(res => {
      //   if (!res.companyIsRegister) {
      //     tempWindow.close();
      //     this.$message.error('用户尚未完成注册，不允许操作')
      //   } else {
      //     tempWindow.location.href = res.data;
      //   }
      //   tempWindow.location.href = res.data;
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-button-group {
  button {
    margin-bottom: 15px;
  }
}
.panel {
  border: 1px solid #ebeef5;
  margin-bottom: 20px;
  .panel-head {
    padding: 8px 10px;
    background-color: #f1f4f5;
    line-height: 32px;
  }
  .panel-title {
    margin-right: 20px;
    color: #555;
    font-weight: 600;
  }
  .panel-content {
    padding: 20px 10px;
    .label-value {
      margin-bottom: 15px;
      line-height: 24px;
      overflow: hidden;
      p {
        margin: 0;
        padding: 0;
      }
      .label {
        float: left;
        width: 100px;
        text-align: right;
      }
      .value {
        margin-left: 100px;
      }
    }
  }
}
</style>

