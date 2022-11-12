import { ref } from 'vue'
import debounce from 'lodash/debounce'
import { getStyle } from '../utils/dom'

export default function useTooltip() {
  const targetRef = ref()
  const tooltipRef = ref()
  const visible = ref(false)
  const tooltipContent = ref('')

  const activateTooltip = debounce(() => { visible.value = true }, 50)

  const handleDivMouseleave = () => {
    if (tooltipRef.value) {
      visible.value = false
    }
  }

  const handleDivMouseEnter = (event: Event, forcedShow: boolean = false, content: string | null = null) => {
    const target: HTMLElement | any = event.target!
    let child: HTMLElement | null = null
    let heightFlag = false
    child = target.firstChild as HTMLElement
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
    if (forcedShow || (rangeWidth + padding > target.offsetWidth || child.scrollWidth > child.offsetWidth) || heightFlag && tooltipRef.value) {
      tooltipContent.value = content || target.textContent
      targetRef.value = target
      activateTooltip()
    }
  }

  return {
    targetRef,
    tooltipRef,
    visible,
    tooltipContent,
    handleDivMouseEnter,
    handleDivMouseleave
  }
}
