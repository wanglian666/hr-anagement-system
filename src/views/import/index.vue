<template>
  <div>
    <Upload-excel :on-success="success"></Upload-excel>
  </div>
</template>

<!-- excel导入功能需要使用npm包 xlsx  需要安装xlsx插件 -->
<script>
import UploadExcel from "@/components/uploadExcel/index.vue";
import { importEmployees } from "@/api/employees";
export default {
  data() {
    return {
      type: value,
    };
  },
  methods: {
    async success({ header, results }) {
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        工号: "workNumber",
      };
      const arr = [];
      results.forEach((item) => {
        const userInfo = {};
        Object.keys(item).forEach((key) => {
          userInfo[userRelations[key]] = item[key];
        });
        arr.push(userInfo);
        console.log("arr", arr);
      });
      await importEmployees(arr);
      this.$router.back();
    },
    // 转换excel的日期格式
    formData(numb, format) {},
  },
  components: { UploadExcel },
};
</script>

<style scoped>
</style>
