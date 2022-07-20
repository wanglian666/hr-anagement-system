<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 设置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDePartment } from "@/api/department";
export default {
  props: {
    // 定义一个props属性
    treeNode: {
      type: Object, //对象类型
      required: true, //必须传treeNode属性
    },
    isRoot: {
      type: Boolean,
      default: false, //默认值
    },
  },
  methods: {
    handleCommand(type) {
      console.log(type);
      if (type == "add") {
        this.$emit("addDeparts", this.treeNode);
      } else if (type == "edit") {
      } else {
        this.$confirm("确定要删除此部门吗？")
          .then(() => {
            // 点击确认进入then
            return delDePartment(this.treeNode.id);
          })
          .then(() => {
            this.$emit("delDepart"); //通知父组件更新
            this.$message.success("删除部门成功");
          })
          .catch(() => {
            // 点击取消进入catch
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>

<style  scoped>
</style>
