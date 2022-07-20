<template>
  <!--  :visible.sync 弹出显示隐藏-->
  <el-dialog title="添加部门" :visible.sync="isShow">
    <el-form label-width="100px" :model="fromData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 100%"
          placeholder="1-50个字符"
          v-model="fromData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 100%"
          placeholder="1-50个字符"
          v-model="fromData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          style="width: 100%"
          placeholder="请选择"
          v-model="fromData.manager"
        ></el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 100%"
          type="textarea"
          placeholder="1300个字符"
          v-model="fromData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-button type="primary" size="small">确认</el-button>
        <el-button type="danger" size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fromData: {
        code: "",
        introduce: "",
        name: "",
        manager: "",
      },
      rules: {
        name: [
          { required: true, messsage: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            messsage: "部门名称要求1~50个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, messsage: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            messsage: "部门编码要求1~50个字符",
            trigger: "blur",
          },
        ],
        introduce: [
          { required: true, messsage: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            messsage: "部门介绍要求1~300个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>
