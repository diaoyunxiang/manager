<template>
  <div class="all">
    <el-table :data="userInfo.users" style="width: 100%">
      <el-table-column prop="useraccount" label="账号" width="150" />
      <el-table-column prop="userpwd" label="密码" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="gender" label="性别" width="150" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="address" label="地址" width="150" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="getId(row)">更改密码</el-button><el-button type="danger" @click="deleteUser(row)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="userInfo.total"
      :current-page="current"
      @current-change="changePage"
    />
    <!-- 修改密码的dialog -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @click="centerDialogVisible = false"
    >
      <span>用户姓名：溍朌齿</span>
      <span>用户账号:2021334953</span>
      <span>原密码:jk970901</span>
      <el-input
        v-model="password"
        show-password
        placeholder="请输入密码"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd()"> 确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { change, deleteUser } from '@/api/requets'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('usersManage', ['userInfo'])
  },
  mounted() {
    this.changePage()
  },
  data() {
    return {
      // dialog的居中属性
      centerDialogVisible: false,
      // 修改密码
      password: '',
      // 分页器
      current: 1,
      pageSize: 6,
      id: ''
    }
  },
  methods: {
    // 分页器改变页面
    changePage(page) {
      if (page) this.current = page
      this.$store.dispatch('usersManage/getUserInfo', {
        current: this.current,
        pageSize: this.pageSize
      })
    },
    // 获取修改用户的id

    getId(data) {
      this.centerDialogVisible = true
      this.id = data._id
    },
    // 修改用户的pwd
    async changePwd() {
      this.centerDialogVisible = false
      await change({
        _id: this.id,
        modifiedpassword: this.password
      })
      this.changePage()
    },
    async deleteUser(row) {
      await deleteUser({ _id: row._id })
      this.changePage()
    }
  }
}
</script>
<style lang="scss" scoped >
.all {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  .el-pagination {
    float: right;
  }
  // dialog的对话窗
  .el-dialog {
    span {
      margin: 20px auto;
      display: flex;
      font-size: 20px;
    }
  }
}
</style>

