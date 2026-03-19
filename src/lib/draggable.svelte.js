export function createDraggable() {
  let windowEl = null
  let titleBarEl = null
  let startX, startY, origLeft, origTop

  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max))
  }

  function dragStart(clientX, clientY) {
    const rect = windowEl.getBoundingClientRect()
    windowEl.style.left = rect.left + 'px'
    windowEl.style.top = rect.top + 'px'
    startX = clientX
    startY = clientY
    origLeft = rect.left
    origTop = rect.top
    windowEl.style.userSelect = 'none'
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
    document.addEventListener('touchmove', onTouchmove, { passive: false })
    document.addEventListener('touchend', onTouchend)
  }

  function dragMove(clientX, clientY) {
    const maxLeft = window.innerWidth - windowEl.offsetWidth
    const maxTop = window.innerHeight - 28 - titleBarEl.offsetHeight
    windowEl.style.left = clamp(origLeft + clientX - startX, 0, maxLeft) + 'px'
    windowEl.style.top = clamp(origTop + clientY - startY, 0, maxTop) + 'px'
  }

  function dragEnd() {
    if (windowEl) windowEl.style.userSelect = ''
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
    document.removeEventListener('touchmove', onTouchmove)
    document.removeEventListener('touchend', onTouchend)
  }

  function onMousemove(e) { dragMove(e.clientX, e.clientY) }
  function onTouchmove(e) { dragMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault() }
  function onMouseup() { dragEnd() }
  function onTouchend() { dragEnd() }

  function onTitleMousedown(e) {
    if (e.target.closest('.title-bar-controls')) return
    dragStart(e.clientX, e.clientY)
    e.preventDefault()
  }

  function onTitleTouchstart(e) {
    if (e.target.closest('.title-bar-controls')) return
    dragStart(e.touches[0].clientX, e.touches[0].clientY)
    e.preventDefault()
  }

  return {
    get windowEl() { return windowEl },
    set windowEl(v) { windowEl = v },
    get titleBarEl() { return titleBarEl },
    set titleBarEl(v) { titleBarEl = v },
    onTitleMousedown,
    onTitleTouchstart,
  }
}
