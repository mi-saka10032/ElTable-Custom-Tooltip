<script setup lang="ts">
import { reactive } from 'vue'
import useTooltip from './hooks/useTooltip'

const column = reactive([
  { label: '姓名', prop: 'name', width: '100' },
  { label: '年龄', prop: 'age', width: '50' },
  { label: '住址', prop: 'livingAddress', width: '200' },
  { label: '联系地址', prop: 'contactAddress', width: '200' }
])
const tableData = reactive([
  {
    name: '张三1',
    age: '18',
    livingAddress: '北京市海淀区明光路11111111111111号',
    contactAddress: '北京市海淀区明光路1号'
  },
  {
    name: '张三2',
    age: '19',
    livingAddress: '北京市海淀区明光路22222222222号',
    contactAddress: '北京市海淀区明光路12222222222222222222222222222222222222222222号'
  },
  {
    name: '张三3',
    age: '20',
    livingAddress: '北京市海淀区明光路3336666666666666666666666666333333333号',
    contactAddress: '北京市海淀区明光路333333333333333333333333333333333333333333333333333333333333333号'
  },
  { name: '张三4', age: '21', livingAddress: '北京市海淀区明光路4号', contactAddress: '北京市海淀区明光路4号' },
  { name: '张三5', age: '22', livingAddress: '北京市海淀区明光路5555号', contactAddress: '北京市海淀区明光路5号' },
  {
    name: '张三6',
    age: '23',
    livingAddress: '北京市海淀区明光路666666666666666666666666666666666666666666666666666666号',
    contactAddress: '北京市海淀区明光路6号'
  }
])
const { visible, tooltipContent, targetRef, handleDivMouseEnter, handleDivMouseleave } = useTooltip()
</script>

<template>
  <el-table :data="tableData">
    <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        align="center"
    >
      <template #default="{ row }">
        <div @mouseenter="handleDivMouseEnter($event)" @mouseleave="handleDivMouseleave">
          <p class="ellipsis-2">{{ row[item.prop] }}</p>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-tooltip
      ref="tooltipRef"
      v-model:visible="visible"
      :content="tooltipContent"
      placement="top"
      effect="light"
      :virtual-ref="targetRef"
      virtual-triggering
      :hide-after="0"
  ></el-tooltip>
</template>

<style scoped>
.ellipsis-2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /**解决中文换行，数字字母不换行问题*/
  word-break: break-all;
  cursor: pointer;
}
</style>
