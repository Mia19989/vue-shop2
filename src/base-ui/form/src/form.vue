<template>
  <div class="hcc-form">
    <!-- 表头和表尾如果有元素的话 用slot插槽 由外面组件自定义 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 双向数据绑定 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <!-- 根据formitem类型 -> 输入框类型 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="op in item.options"
                    :key="op.value"
                    :value="op.value"
                    >{{ op.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'
export default defineComponent({
  // props接收传值
  props: {
    formItems: {
      // 断言props的类型是IFormItem类型的数组
      type: Array as PropType<IFormItem[]>,
      // 如果type是数组或者对象类型 在写默认值default的时候需要写箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 30px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px 24/6 = 4
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    },

    // 表单双向绑定数据
    modelValue: {
      type: Object,
      // 必填
      required: true
    }
  },

  // 向外传值
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // 双向绑定的是拷贝后的数据 modelValue中的每个元素 -> 并不能双向绑定modelValue
    const formData = ref({ ...props.modelValue })

    // watch监听formData数据发生改变 传给user
    watch(
      formData,
      (newValue) => {
        console.log(newValue)
        emit('update:modelValue', newValue)
      },
      {
        // 开启深度监听 formData中的每个属性
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.hcc-form {
  padding-top: 22px;
}
</style>
