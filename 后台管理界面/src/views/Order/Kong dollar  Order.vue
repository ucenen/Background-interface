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
                       width="80"> </el-table-column>
      <el-table-column prop="name"
                       label="订单编号"
                       width="100">
      </el-table-column>

      <el-table-column prop="birth"
                       label="礼品名称"
                       width="100">
      </el-table-column>
      </el-table-column>

      <!-- <el-table-column prop="age" label="是否热门" width="120">
      </el-table-column -->

      <el-table-column prop="addr"
                       label="消费者"
                       min-width="100">
      </el-table-column>
      <el-table-column prop="birth"
                       label="消费者类型"
                       width="100">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="birth"
                       label="单价"
                       width="100">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="birth"
                       label="数量"
                       width="100">
      </el-table-column>
      </el-table-column>

      <el-table-column prop="birth"
                       label="应付"
                       width="120">
      </el-table-column>
      <el-table-column prop="birth"
                       label="实付"
                       width="120">
      </el-table-column>
      <el-table-column prop="birth"
                       label="购买时间"
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
        <el-form-item label="礼品名称"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="消费者"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="单价"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="实付"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应付"
                      prop="">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
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
      edit: 'true',
      readonly: true,
      dialogStatus: '',
      textMap: {
        update: '编辑',
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
