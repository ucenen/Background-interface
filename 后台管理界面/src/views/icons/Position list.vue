<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="filters"
               @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name"
                    placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users"
              highlight-current-row
              @selection-change="selsChange"
              style="width: 100%;">
      <!-- :formatter="formatSex" -->
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column type="index"
                       width="120"> </el-table-column>
      <el-table-column prop="name"
                       label="名称"
                       width="100">
      </el-table-column>

      <el-table-column prop="birth"
                       label="发布企业"
                       width="120">
      </el-table-column>
      </el-table-column>

      <!-- <el-table-column prop="age" label="是否热门" width="120">
      </el-table-column -->

      <el-table-column prop="addr"
                       label="城市"
                       min-width="100">
      </el-table-column>
      <el-table-column prop="birth"
                       label="招聘数量"
                       width="100">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="birth"
                       label="学历"
                       width="100">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="birth"
                       label="创建时间"
                       width="100">
      </el-table-column>
      </el-table-column>

      <el-table-column prop="birth"
                       label="更新时间"
                       width="120">
      </el-table-column>
      <el-table-column prop="birth"
                       label="热门"
                       width="120">
      </el-table-column>
      <el-table-column prop="birth"
                       label="排序值"
                       width="120">
      </el-table-column>
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger"
                     size="small"
                     @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24"
            class="toolbar">
      <el-button type="danger"
                 @click="batchRemove"
                 :disabled="this.sels.length === 0">批量删除</el-button>
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :page-size="20"
                     :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false">
      <el-form :model="editForm"
               label-width="80px"
               :rules="editFormRules"
               ref="editForm">
        <el-form-item label="企业名称"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="热门">
          <el-radio-group v-model="editForm.sx">
            <el-radio class="radio"
                      :label="1">是</el-radio>
            <el-radio class="radio"
                      :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序值"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作地点"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历要求">
          <el-radio-group v-model="editForm.xl">
            <el-radio class="radio"
                      :label="1">本科</el-radio>
            <el-radio class="radio"
                      :label="2">硕士</el-radio>
            <el-radio class="radio"
                      :label="3">博士</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="福利待遇"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="薪资区间">
          <el-radio-group v-model="editForm.xzz">
            <el-radio class="radio"
                      :label="1">3-5k</el-radio>
            <el-radio class="radio"
                      :label="2">5-10k</el-radio>
            <el-radio class="radio"
                      :label="3">10-20k</el-radio>
            <el-radio class="radio"
                      :label="4">20-50k</el-radio>
            <el-radio class="radio"
                      :label="5">50k以上</el-radio>
            <el-radio class="radio"
                      :label="6">面议</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="食/宿">
          <el-radio-group v-model="editForm.ss">
            <el-radio class="radio"
                      :label="1">无工作餐有住宿</el-radio>
            <el-radio class="radio"
                      :label="2">有工作餐有住宿</el-radio>
            <el-radio class="radio"
                      :label="3">有工作餐无住宿</el-radio>
            <el-radio class="radio"
                      :label="4">无工作餐无住宿</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="职位描述"
                      prop="">
          <el-input v-model="editForm.ms"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="职位要求"
                      prop="">
          <el-input v-model="editForm.yq"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="对应学校"
                      prop="">
          <el-input v-model="editForm.scchool"
                    auto-complete="off"></el-input>
        </el-form-item>
        <!-- <div>
           <span class="demonstration">时间选择</span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"   
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </div> -->
        <!-- 
        <span class="demonstration">日期</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator=""
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        > -->
        </el-date-picker>
        <!-- <el-form-item label="热门">
          <el-radio-group v-model="editForm.rrm">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="双一流">
          <el-radio-group v-model="editForm.syl">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="211工程">
          <el-radio-group v-model="editForm.t11">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="985工程">
          <el-radio-group v-model="editForm.n85">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性质">
          <el-radio-group v-model="editForm.xz">
            <el-radio class="radio" :label="1">公办</el-radio>
            <el-radio class="radio" :label="0">私办</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="宣讲类型">
          <el-radio-group v-model="editForm.leix">
            <el-radio class="radio" :label="1">宣讲会+双选会</el-radio>
            <el-radio class="radio" :label="0">线上双选会</el-radio>
            <el-radio class="radio" :label="2">线上宣讲会会</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序值" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="电话" prop="name">
          <el-input v-model="editForm.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="name">
          <el-input v-model="editForm.add" auto-complete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="name">
          <el-input v-model="editForm.bz" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-radio-group v-model="editForm.sx">
            <el-radio class="radio" :label="1">已认证</el-radio>
            <el-radio class="radio" :label="2">认证中</el-radio>
            <el-radio class="radio" :label="3">未认证</el-radio>
            <el-radio class="radio" :label="4">认证失败</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <!-- <el-form-item label="认证状态">
          <el-form-group v-model="editForm.rz">
            <el-radio v-model="rad" :label="1">已认证</el-radio>
            <el-radio v-model="rad" :label="2">认证中</el-radio>
            <el-radio v-model="rad" :label="3">未认证</el-radio>
            <el-radio v-model="rad" :label="4">认证失败</el-radio> -->
        <!-- <el-form-item label="年龄">
          <el-input-number
            v-model="editForm.age"
            :min="0"
            :max="200"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.birth"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item label="简介">
          <el-input type="textarea"
                    v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus == 'create'"
                   type="primary"
                   @click="createData">添加</el-button>
        <el-button v-else
                   type="primary"
                   @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '@/utils/table.js'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from '@/api/userTable'

export default {
  data () {
    return {
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      dialogFormVisible: false,
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        id: '0',
        name: '',
        sex: 1,
        age: 0,
        birth: '',
        addr: '',
        sx: '',
        value1: '',
        scchool: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    value1: function () { },
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      const para = {
        page: this.page,
        name: this.filters.name
      }
      getUserListPage(para).then(res => {
        this.total = res.data.total
        this.users = res.data.users
      })
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { id: row.id }
          removeUser(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          })
        })
        .catch(() => { })
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.editForm = {
        id: '0',
        name: '',
        sex: 1,
        age: 0,
        birth: '',
        addr: ''
      }
    },
    // 编辑
    updateData () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              para.birth =
                !para.birth || para.birth === ''
                  ? ''
                  : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
              editUser(para).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getUsers()
              })
            })
            .catch(e => {
              // 打印一下错误
              console.log(e)
            })
        }
      })
    },
    // 新增
    createData: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.editForm.id = parseInt(Math.random() * 100).toString() // mock a id
              const para = Object.assign({}, this.editForm)
              console.log(para)

              para.birth =
                !para.birth || para.birth === ''
                  ? ''
                  : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
              addUser(para).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getUsers()
              })
            })
            .catch(e => {
              // 打印一下错误
              console.log(e)
            })
        }
      })
    },
    // 全选单选多选
    selsChange (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { ids: ids }
          batchRemoveUser(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          })
        })
        .catch(() => { })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped></style>
