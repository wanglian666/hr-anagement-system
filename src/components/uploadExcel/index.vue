<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" size="mini" type="primary"
        >点击上传</el-button
      >
    </div>
    <!-- accept	接受上传的文件类型 -->
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx,.xls"
    />
    <el-upload drag multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 200px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload {
    border: 1px dashed #bbb;
    width: 360px;
    height: 180px;
    text-align: center;
    line-height: 180px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
}
</style>
