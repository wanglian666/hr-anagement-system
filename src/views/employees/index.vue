<template>
  <div class="dashboard-container">
    <!-- 自定义组件 -->
    <page-tools :show-before="true">
      <template slot="before">
        <span>共16条记录</span>
      </template>
      <template slot="after">
        <el-button size="small" type="success" @click="goImport"
          >excel导入</el-button
        >
        <el-button size="small" type="danger">excel导出</el-button>
        <el-button size="small" type="primary" @click="showDialog = true"
          >新增员工</el-button
        >
      </template>
    </page-tools>
    <!-- 表格 -->
    <el-table border :data="list">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="姓名" sortable prop="username"></el-table-column>
      <el-table-column label="头像"></el-table-column>
      <el-table-column
        label="工号"
        prop="workNumber"
        sortable
      ></el-table-column>
      <el-table-column label="聘用形式" prop="formOfEmployment" sortable>
      </el-table-column>
      <el-table-column
        label="部门"
        prop="departmentName"
        sortable
      ></el-table-column>
      <el-table-column
        label="入职时间"
        prop="timeOfEntry"
        sortable
      ></el-table-column>
      <el-table-column
        label="账号状态"
        prop="enableState"
        sortable
      ></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">转正</el-button>
          <el-button type="text" size="small">调岗</el-button>
          <br />
          <el-button type="text" size="small">离职</el-button>
          <el-button type="text" size="small">角色</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="center" align="middle" style="height: 60px">
      <el-pagination
        layout="prev, pager, next"
        :page-size="page.size"
        :current-page="page.page"
        :total="page.total"
        @current-change="changepage"
      ></el-pagination>
    </el-row>

    <!-- 新增员工 -->
    <!-- sync修饰符是子组件改变父组件的数据的一个语法糖 -->
    <add-emplooyees :showDialog.sync="showDialog"></add-emplooyees>
  </div>
</template>
<script>
import { getEmployeeList } from "@/api/employees";
import addEmplooyees from "./components/addEmplooyees.vue";
export default {
  components: { addEmplooyees },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      showDialog: false, //控制员工新增弹框的显示隐藏
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    async getEmployeeList() {
      let { total, rows } = await getEmployeeList(this.page);
      console.log(rows);
      this.page.total = total;
      this.list = rows;
    },
    changepage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList();
    },

    // 跳转上传页面
    goImport() {
      this.$router.push("/import?type=user");
    },
  },
};
</script>

<style>
.dashboard-container {
  padding: 20px;
}
</style>
