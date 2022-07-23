<template>
  <div class="setting-container" style="padding: 20px">
    <el-card class="box-card" shadow>
      <el-tabs v-model="activeName">
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="first">
          <el-row style="line-height: 60px">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="showDialog = true"
              >新增角色</el-button
            >
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
                <el-button
                  size="mini"
                  type="primary"
                  @click="editRole(scope.row.id)"
                  >编辑</el-button
                >
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
    </el-card>

    <!-- 弹框 -->
    <el-dialog title="编辑角色" :visible.sync="showDialog">
      <el-form :model="fromData" :rules="rules" ref="fromData">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="fromData.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoleList,
  delRoleById,
  getRoleDetails,
  updateRole,
  addRole,
} from "@/api/setting";
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
      // 弹框设置
      showDialog: false,
      fromData: {},
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async editRole(id) {
      // 点击编辑，获取当前点击的角色详情
      this.fromData = await getRoleDetails(id);
      console.log(this.fromData);
      this.showDialog = true;
    },
    // 点击编辑里面的确定按钮
    async btnOK() {
      try {
        // 只有验证通过的情况下，才会执行await下方的内容
        await this.$refs.fromData.validate();
        if (this.fromData.id) {
          // 编辑
          await updateRole(this.fromData);
        } else {
          // 新增
          await addRole(this.fromData);
        }
        // 重新获取数据
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        this.fromData = {};
      } catch (error) {
        this.$message(error);
      }
    },
    // 删除
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

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
</style>
