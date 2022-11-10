import { debounce } from 'lodash-es'
import { getStyle } from '@/utils/dom'

export default {
  data: () => ({
    tooltipContent: ''
  }),
  created() {
    this.activateTooltip = debounce(tooltip => tooltip.handleShowPopper(), 50)
  },
  methods: {
    // selector 选择器名称 forcedShow 无论超不超出范围都强制展示
    handleDivMouseEnter($event, forcedShow = false, content = null) {
      const target = $event.target
      // 判断是否text-overflow, 如果是就显示tooltip
      // 如果宽度被限定，则也可以通过高度判断
      let child = null
      let heightFlag = false
      child = target.firstChild
      if (child) {
        if (child.scrollHeight > child.offsetHeight) {
          heightFlag = true
        }
      } else return
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange()
      range.setStart(child, 0)
      range.setEnd(child, child.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      let padding = (parseInt(getStyle(target, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(target, 'paddingRight'), 10) || 0) +
        (parseInt(getStyle(child, 'marginLeft'), 10) || 0)
      if (!padding) {
        padding = 0
      }
      if (forcedShow || (rangeWidth + padding > target.offsetWidth || child.scrollWidth > child.offsetWidth) || heightFlag && this.$refs.tooltip) {
        const tooltip = this.$refs.tooltip
        this.tooltipContent = content || target.innerText || target.textContent
        tooltip.referenceElm = target
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
        tooltip.doDestroy()
        tooltip.setExpectedState(true)
        this.activateTooltip(tooltip)
      }
    },
    handleDivMouseleave() {
      const tooltip = this.$refs.tooltip
      if (tooltip) {
        tooltip.setExpectedState(false)
        tooltip.handleClosePopper()
      }
    }
  }
}
