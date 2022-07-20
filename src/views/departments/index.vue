<template>
  <div class="departments-container">
    <div class="departments-text">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true"></tree-tools>

        <el-tree
          :data="departments"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容  自动循环多次  循环多个节点
        slot-scope="对象"  作用域插槽  接收传递给插槽的数据  data每个节点对象
         -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepart="getDePartments"
            @addDeparts="addDeparts"
          ></tree-tools>
        </el-tree>
      </el-card>

      <!-- 添加部门弹窗组件 -->
      <add-depart :isShow="showDialog"></add-depart>
    </div>
  </div>
</template>
<script>
import treeTools from "./components/tree-tools.vue";
import addDepart from "./components/add-depart.vue";
import { getDePartment } from "@/api/department";
import { tanListToTreeData } from "@/utils/index";
export default {
  data() {
    return {
      defaultProps: {
        label: "name",
      },
      company: {
        name: "丁鹿学堂教育机构",
        manager: "负责人",
      },

      departments: [],
      showDialog: false, //弹窗组件的显示隐藏
      node: null, //用来记录当前点击的部门
    };
  },
  created() {
    this.getDePartments();
  },
  methods: {
    async getDePartments() {
      let result = await getDePartment();
      console.log(result.depts);
      this.departments = tanListToTreeData(result.depts, "");
    },
    addDeparts(node) {
      // 点击添加子部门
      this.showDialog = true;
      this.node = node;
    },
  },
  components: {
    treeTools,
    addDepart,
  },
};
</script>

<style lang="scss">
.tree-card {
  margin-top: 50px;
  padding: 20px 30px;
  font-size: 14px;
}
</style>
