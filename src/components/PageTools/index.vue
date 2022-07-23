<template>
  <div>
    <el-card class="page-tools">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <div v-if="showBefore" class="before">
            <i class="el-icon-info">
              <!-- 插槽 -->
              <slot name="before"></slot>
            </i>
          </div>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end" class="after">
            <!-- 插槽 -->
            <slot name="after"></slot>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.page-tools {
  margin: 10px 0;
}
.before {
  line-height: 35px;
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid #91d5ff;
  background: #e6f7ff;
}

.before i {
  color: #409eff;
  margin-right: 10px;
}
</style>
