<template>
  <div class="setting-container">
    <div class="setting-text">
      <el-tabs v-model="activeName" style="margin: 20px">
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="first">
          <el-row style="line-height: 60px">
            <el-button type="primary" icon="el-icon-plus">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table border :data="list">
            <el-table-column label="序号" width="120" type="index">
            </el-table-column>
            <el-table-column
              label="名称"
              width="240"
              prop="name"
            ></el-table-column>
            <el-table-column label="描述" prop="description"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success">分配权限</el-button>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteRole(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="line-height: 60px"
          >
            <el-pagination
              layout="prev, pager, next"
              :total="page.total"
              :current-page="page.page"
              :page-sizes="page.pageSize"
              @current-change="changePage"
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getRoleList, delRoleById } from "@/api/setting";
export default {
  data() {
    return {
      activeName: "first",
      list: [], //角色列表
      page: {
        page: 1, //当前页码
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async deleteRole(id) {
      try {
        await this.$confirm("确定要删除吗？");
        await delRoleById(id);
        this.$message("删除角色成功！");
        // 重新渲染数据
        this.getRoleList();
      } catch (error) {
        this.$message(error);
      }
    },
    changePage(newPage) {
      //newPage  当前的页面
      this.page.page = newPage;
      // 重新渲染数据
      this.getRoleList();
    },

    async getRoleList() {
      let { total, rows } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
    },
  },
};
</script>

<style></style>
