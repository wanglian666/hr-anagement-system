<template>
  <el-dialog title="新增员工" :visible.sync="showDialog">
    <el-form :model="formData" :rules="rules" ref="formData">
      <el-form-item label="姓名" prop="username">
        <el-input
          style="width: 50%"
          v-model="formData.username"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          style="width: 50%"
          v-model="formData.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          style="width: 50%"
          v-model="formData.timeOfEntry"
          placeholder="请输入入职时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          style="width: 50%"
          v-model="formData.formOfEmployment"
          placeholder="请选择"
        >
          <el-option
            v-for="item in empHireType.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          style="width: 50%"
          v-model="formData.workNumber"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          style="width: 50%"
          v-model="formData.departmentName"
          placeholder="请输入部门"
          @focus="getDepartments"
        ></el-input>
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          default-expand-all
          :props="{ label: 'name' }"
          @node-click="selectNode"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker
          style="width: 50%"
          placeholder="请输入转正时间"
          v-model="formData.correctionTime"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDePartment } from "@/api/department";
import { addEmployees } from "@/api/employees";
import { tanListToTreeData } from "@/utils/index";
import empHireType from "@/api/constant/employees";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      empHireType, //聘用形式定义
      treeData: [], //定义数组接收树形数据 --部门数据
      showTree: false, //控制树形数据的显示隐藏
      loading: false, //控制树的显示和隐藏的进度条
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "姓名应在1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
    };
  },

  methods: {
    async getDepartments() {
      this.showTree = true;
      this.loading = true;
      const { depts } = await getDePartment();
      // depts转换树形数据
      this.treeData = tanListToTreeData(depts, "");
      this.loading = false;
    },
    // 点击部门赋值
    selectNode(node) {
      this.formData.departmentName = node.name;
      this.showTree = false;
      // console.log(node.name);
    },

    // 点击确认按钮
    async btnOk() {
      try {
        // 进行表单验证
        await this.$refs.formData.validate();
        await addEmployees(this.formData);
        // 告诉父组件更新数据
        // this.$parent 可以直接调用父组件的实例 ，
        this.$parent.getEmployeeList();
        this.$parent.showDialog = false;
        this.$message.success("添加成功！");
      } catch (error) {
        console.log(error);
      }
    },

    // 点击取消按钮
    btnCancel() {
      (this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      }),
        this.$refs.formData.resetFields(); //表单重置验证
      this.$emit("update:showDialog", false);
    },
  },
};
</script>
