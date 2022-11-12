# Description
A custom ElTooltip plan for multiple line ellipsis based on ElTable
One ElTooltip for The Whole ElTable

# 简介
基于ElTable的面向多行省略文本展示用的自定义ElTooltip方案

一个ElTable里自始至终只有一个ElTooltip，避免了每个单元格都需要判断加载ElTooltip实例的情景，减轻DOM渲染压力

11-12更新：在vue3分支增加了vue3版element-plus的自定义tooltip，由于element-plus自带虚拟触发和单例模式，代码有所简化，详见
<a href="https://element-plus.gitee.io/zh-CN/component/tooltip.html#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F">element-plus Tooltip单例模式</a>
