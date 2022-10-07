<template>
  <div v-loading="loading" class="policy-container">
    <search-tabbar :policy-name="policyPage.policyName" @searchByPolicyName="searchByPolicyName" />
    <div class="policy-table">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-circle-plus-outline" class="addPolicy-btn" @click="exitPolicy">新建</el-button>
        </div>
        <div class="text item">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#f3f6fb'}"
          >
            <el-table-column
              label="序号"
              width="100"
              type="index"
            />
            <el-table-column
              prop="policyName"
              label="策略名称"
            />
            <el-table-column
              prop="discount"
              label="策略方案"
            />
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="240"
            />
            <el-table-column
              label="操作"
              width="180"
            >
              <template slot-scope="{row}">
                <el-button ref="getdetail" size="small" type="text" @click="getDetail(row)">查看详情</el-button>
                <el-button size="small" type="text" @click="exitPolicy(row)">修改</el-button>
                <el-button size="small" type="text" class="del-policy" @click="delPolicy(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="total>10" class="policy-page">
          <div class="policy-page_total">
            <div> <span>共{{ total }}条记录</span>
              <span>第{{ policyPage.pageIndex }}/ {{ policyPage.totalPage }}页</span></div>
            <el-pagination
              background
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :current-page.sync="policyPage.pageIndex"
              :page-size.sync="policyPage.totalPage"
              @current-change="getPolicyList"
              @size-change="getPolicyList"
            />

          </div>
        </div>
      </el-card>

    </div>
    <!-- 查看详情区域 -->
    <div class="policy-container">
      <el-dialog title="策略详情" :visible.sync="dialogVisible" width="630px">
        <el-form>
          <el-form-item label="策略名称：">
            <span>{{ policyName }}</span>
          </el-form-item>
          <el-form-item label="活动区域：" class="activeArea">
            <span>
              <el-table :data="gridData" :header-cell-style="{background:'#f3f6fb'}" :row-style="{height:'43px'}">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50px"
                />
                <el-table-column
                  label="点位名称"
                  property="nodeName"
                />
                <el-table-column property="innerCode" label="设备编号" width="150px" />
              </el-table>
            </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="pagination">
            <div class="pagination__total">

              <span>共{{ policyDetailList.totalCount }}条记录</span>
              <span>第{{ policyDetailList.pageIndex }}/ {{ policyDetailList.totalPage }}页</span>
              <el-pagination
                background
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :current-page.sync="policyDetailPage.pageIndex"
                :page-size.sync="policyDetailPage.totalPage"
                @current-change="toPrevPolicy"
                @size-change="toPrevPolicy"
              />

            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 修改详情区域 -->
    <div class="editPolicy">
      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form ref="policyDetail" :model="policyDetail" :rules="rules">
          <el-form-item label="策略名称：" :label-width="formLabelWidth">
            <el-input
              v-model="policyDetail.policyName"
              type="text"
              placeholder="请输入内容"
              maxlength="15"
              show-word-limit
              autocomplete="off"
              prop="policyName"
              :validate-event="false"
            />

          </el-form-item>
          <el-form-item label="策略方案：" :label-width="formLabelWidth" class="policy-discount" prop="discount">
            <el-input-number
              v-model.number="policyDetail.discount"
              controls-position="right"
              :min="1"
              :max="100"
              placeholder="请输入"
              class="policy-discount-ipt"
              :validate-event="false"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="button--secondary" @click="handleClose">取 消</el-button>
          <el-button type="primary" class="confim-btn" @click="pullEditPolicy">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SearchTabbar from '@/components/SearchTab/SearchTabbar.vue'
import { getPolicyListAPI, getPolicyDetailAPI, exitPolicyAPI, delPolicyAPI, addPolicyAPI } from '@/api/policy'

export default {
  components: {
    SearchTabbar
  },
  data() {
    return {
      policyPage: { // 主页面数据带参
        pageIndex: 1,
        pageSize: 10,
        policyName: '',
        totalPage: 0
      },
      tableData: [], // 页面总数据
      total: 0,
      dialogVisible: false, // 详情弹窗
      policyDetailPage: { // 详情弹窗的分页组件
        pageIndex: 1,
        pageSize: 10
      },
      policyDetail: {
        discount: 0,
        policyName: ''
      }, //
      policyDetailList: {}, // 详情策略信息数据
      gridData: [],
      dialogFormVisible: false, // 修改弹窗
      formLabelWidth: '100px',
      policyId: null, // 点击详情的id
      exitPolicyId: null,
      title: '修改策略',
      policyName: '',
      rules: {
        discount: [
          { required: true, message: '请输入' }
        ],
        policyName: [
          { required: true, message: '请输入' }
        ]
      },
      policyTotal: 0,
      loading: false
    }
  },
  created() {
    this.getPolicyList()
  },
  methods: {
    async getPolicyList() {
      try {
        this.loading = true
        const { data } = await getPolicyListAPI(this.policyPage)
        // console.log(data)
        this.tableData = data.currentPageRecords
        this.total = data.totalCount
        this.policyPage.pageIndex = +data.pageIndex
        this.policyPage.totalPage = +data.totalPage
        if (data.totalCount > 0 && data.currentPageRecords.length === 0) {
          this.policyPage.pageIndex = this.policyPage.pageIndex - 1
          this.getPolicyList()
        }
      } catch (e) {
        throw new Error()
      } finally {
        this.loading = false
      }
    },
    handleClose() {
      this.$refs.policyDetail.resetFields()
      this.dialogFormVisible = false
      this.policyDetail = {
        discount: 0,
        policyName: ''
      }
    },
    searchByPolicyName(val) {
      this.policyPage.policyName = val
      this.getPolicyList()
    },
    async  getDetail(val) {
      this.policyId = val.policyId
      this.policyName = val.policyName
      try {
        const { data } = await getPolicyDetailAPI(this.policyId, this.policyDetailPage)
        // console.log(data)
        this.policyDetailList = data
        this.gridData = data.currentPageRecords
        this.policyDetailPage.pageIndex = +data.pageIndex
        this.policyDetailPage.totalPage = +data.totalPage
        this.dialogVisible = true
      } catch (e) {
        this.$message.fail(e.message)
      }
    },
    async toPrevPolicy() {
      // console.log(this.policyDetailPage)
      const { data } = await getPolicyDetailAPI(this.policyId, this.policyDetailPage)
      // console.log(data)
      this.policyDetailList = data
      this.gridData = data.currentPageRecords
      this.policyDetailPage.pageIndex = +data.pageIndex
      this.policyDetailPage.totalPage = +data.totalPage
    },
    exitPolicy(val) {
      // console.log(val)
      this.title = val.exitPolicyId ? '修改策略' : '新增策略'
      this.exitPolicyId = val.policyId
      this.policyDetail = { policyName: val.policyName, discount: val.discount }
      this.dialogFormVisible = true
    },
    // 修改策略详情
    async pullEditPolicy() {
      // console.log(this.exitPolicyId)
      // console.log(this.policyDetail)
      await this.$refs.policyDetail.validate()
      try {
        this.exitPolicyId ? await exitPolicyAPI(this.exitPolicyId, this.policyDetail) : await addPolicyAPI(this.policyDetail)
        // console.log(res)
        this.$message.success(this.exitPolicyId ? '修改成功' : '添加成功')
        this.getPolicyList()
        this.dialogFormVisible = false
      } catch (e) {
        throw new Error()
      }
    },
    // 删除策略详情
    async delPolicy(val) {
      try {
        await this.$confirm('确定删除该条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPolicyAPI(val.policyId, this.policyPage)
        this.policyPage.policyName = ''
        this.$message.success('删除成功')
        this.getPolicyList()
      } catch (e) {
        throw new Error()
      }
    }

  }
}
</script>
<style  lang="scss">
.policy-container {
   .el-dialog {
    width: 630px;
  }
.el-dialog__header {
  background-color: #fff !important;
.el-dialog__title {
  color: #333;
  font-size: 16px;
  font-weight: 700;
}
}
.el-form-item__label {
font-weight: 400;
}
.activeArea {
  display: flex;
  th,tr,td {
  background-color:#fcfdfe;
  border: 0;
}
}
.el-form-item__content {
  width: 396px;
}
.el-dialog__body {
padding-left: 50px;
padding-bottom: 0px;
}
.dialog-footer {
    // background: #fff;
    padding: 32px 16px;
    padding-top: 0;
    padding-left: 110px;
    white-space: nowrap;
    .pagination {
 padding: 2px 5px;
    color: #333;
    width: 396px;
    line-height: 36px;
    font-size: 14px;
    }
.pagination__total {
      display: flex;
    font-size: 13px;
    min-width: 35.5px;
    height: 40px;
    line-height: 38px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex: 1;
    font-size: 16px!important;
    color: #dbdfe5!important;
    margin-right: 10px;
}
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
}
}
.el-table {
  position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #606266;}
}
.el-dialog__header .el-icon-close:before {
    color: #999;
}
.policy-container {
  .editPolicy {
   .el-input__inner {
    height: 36px;
    line-height: 36px;
    .el-dialog .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 40px;
    .dialog-footer {
    padding-top: 0;
    text-align: center;
    display: flex;
}
}

}
.el-dialog__body {
  padding-left: 10px;
}

.dialog-footer {
  display: flex;
 margin-left: 70px;
 .button--secondary {
  margin-right: 30px;
  width: 80px;
  height: 36px;
  background-color: #fbf4f0;
 }
}

 .policy-discount-ipt {
 width: 100%;
 }
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #d8dde3;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
}
}
.policy-page {
  height: 95px;
  padding: 35px 16px;
  color: #ccc;
  .policy-page_total {
   display: flex;
  justify-content: space-between;
      .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
}
  }}
</style>
<style scoped lang="scss">
.policy-container {
  padding-left: 20px;
  .policy-table {
    width: 100%;
      .box-card {
  width: 100%;
  .addPolicy-btn {
  background-color: #ff8a3b;
  border: 0;
}
}
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

}
.del-policy {
  color: red;
}
::v-deep .el-table::before{
 background-color: transparent;
}
::v-deep .el-table td{
border-bottom: none;
height: 44px !important;
padding: 0px !important;
}
::v-deep .el-table tbody tr:hover>td { border-radius: 5px;}
::v-deep .el-table th.is-leaf {
border-bottom: none;
 height: 44px;
 }
 .confim-btn {
 background-color: #ff8739;
 border: 0;
}
</style>
