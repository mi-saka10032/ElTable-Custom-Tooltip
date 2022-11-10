<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        align="center"
      >
        <template slot-scope="{ row }">
          <!--TODO 4、将需要多行省略（css实现）的文本元素用div包裹起来并注入mouseenter和mouseleave事件-->
          <div @mouseenter="handleDivMouseEnter($event)" @mouseleave="handleDivMouseleave">
            <p class="ellipsis-2">{{ row[item.prop] }}</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--TODO 1、引入el-tooltip并写好ref和content属性-->
    <el-tooltip ref="tooltip" placement="top" effect="light" :content="tooltipContent" />
  </div>
</template>

<script>
// TODO 2、引入tooltipMixins混入文件
import tooltipMixins from '@/mixins/tooltip-mixins'

export default {
  name: 'App',
  // TODO 3、混入实现
  mixins: [tooltipMixins],
  data: () => ({
    column: [
      { label: '姓名', prop: 'name', width: '100' },
      { label: '年龄', prop: 'age', width: '50' },
      { label: '住址', prop: 'livingAddress', width: '200' },
      { label: '联系地址', prop: 'contactAddress', width: '200' }
    ],
    tableData: [
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
    ]
  })
}
</script>

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
