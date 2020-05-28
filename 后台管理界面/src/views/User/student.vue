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
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column type="index"
                       width="60"> </el-table-column>
      <el-table-column prop="name"
                       label="学校"
                       width="110"> </el-table-column>
      <el-table-column prop="sex"
                       label="姓名"
                       width="110"
                       :formatter="formatSex">
      </el-table-column>
      <el-table-column prop="age"
                       label="电话"
                       width="110"> </el-table-column>
      <el-table-column prop="birth"
                       label="邮箱"
                       width="110"> </el-table-column>
      <el-table-column prop="addr"
                       label="毕业时间"
                       min-width="110">
      </el-table-column>
      <el-table-column prop="update"
                       label="更新时间"
                       min-width="110">
      </el-table-column>
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <!-- <el-button
            type="danger"
            size="small"
            @click="Del(scope.$index, scope.row)"
            >删除</el-button
          > -->
          <el-button type="danger"
                     size="small"
                     @click="Del(id)">删除</el-button>
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
        <section>
          <img v-if="!progressFlag"
               class="head-img"
               src="cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <div v-show="progressFlag"
               class="head-img">
            <el-progress type="circle"
                         :percentage="progressPercent"></el-progress>
          </div>
          <el-upload class="img-btn"
                     action="#"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload"
                     :http-request="uploadImg">
            <el-button type="success"
                       plain
                       round
                       size="mini">更改头像</el-button>
          </el-upload>
        </section>

        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="editForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.number"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="name">
          <el-input v-model="editForm.adresss"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校"
                      prop="name">
          <el-input v-model="editForm.school"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改次数"
                      prop="name">
          <el-input v-model="editForm.change"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="院系"
                      prop="name">
          <el-input v-model="editForm.yuanxi"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="专业"
                      prop="name">
          <el-input v-model="editForm.yuanxi"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio"
                      :label="1">男</el-radio>
            <el-radio class="radio"
                      :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="在职状态">
          <el-radio-group v-model="editForm.zt">
            <el-radio class="radio"
                      :label="1">是</el-radio>
            <el-radio class="radio"
                      :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item> -->
        <el-form-item label="生日">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="editForm.birth"></el-date-picker>
        </el-form-item>

        <el-form-item label="毕业时间">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="editForm.birth"></el-date-picker>
        </el-form-item>

        <el-form-item label="备注"
                      prop="name">
          <el-input v-model="editForm.yuanxi"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注信息">
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
        update: '编辑',
        create: 'Create'
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
        change: '',
        yuanxi: '',
        school: '',
        adresss: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    }
  },
  methods: {
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
    // Del(index, row) {
    //   this.$confirm('确认删除该记录吗?', '提示', {
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       const para = { id: row.id }
    //       removeUser(para).then(res => {
    //         this.$message({
    //           message: '删除成功',
    //           type: 'success'
    //         })
    //         this.getUsers()
    //       })
    //     })
    //     .catch(() => {})
    // },
    Del (id) {
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
