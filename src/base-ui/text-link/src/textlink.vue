<template>
  <div class="text-link">
    <template v-for="(item, index) in textArrs" :key="index">
      <div class="item">
        <span class="title">{{ item.title }}</span>
        <el-link type="primary">{{ item.descriptions }}</el-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    textArrs: {
      type: Array,
      default: () => []
    }
  },

  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.text-link {
  padding: 0 15px;
  margin-bottom: 40px;
  text-align: left;

  .item {
    margin: 5px;

    .title {
      position: relative;
      display: inline-block;
      margin-right: 20px;
    }

    // title前的小圆点
    .title::before {
      position: absolute;
      top: 40%;
      left: -15px;
      width: 5px;
      height: 5px;
      background-color: black;
      border-radius: 100%;
      content: '';
    }
  }
}
</style>
