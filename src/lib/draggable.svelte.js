export function createDraggable() {
  let windowEl = $state(null)
  let titleBarEl = $state(null)

  let dragging = false
  let startX = 0
  let startY = 0
  let origLeft = 0
  let origTop = 0

  function snapToPixels() {
    const rect = windowEl.getBoundingClientRect()
    windowEl.style.left = rect.left + 'px'
    windowEl.style.top = rect.top + 'px'
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max))
  }

  function dragStart(clientX, clientY) {
    snapToPixels()
    dragging = true
    startX = clientX
    startY = clientY
    origLeft = parseFloat(windowEl.style.left)
    origTop = parseFloat(windowEl.style.top)
    windowEl.style.userSelect = 'none'
  }

  function dragMove(clientX, clientY) {
    if (!dragging) return
    const dx = clientX - startX
    const dy = clientY - startY
    const taskbarH = 28
    const maxLeft = window.innerWidth - windowEl.offsetWidth
    const maxTop = window.innerHeight - taskbarH - titleBarEl.offsetHeight
    windowEl.style.left = clamp(origLeft + dx, 0, maxLeft) + 'px'
    windowEl.style.top = clamp(origTop + dy, 0, maxTop) + 'px'
  }

  function dragEnd() {
    dragging = false
    if (windowEl) windowEl.style.userSelect = ''
  }

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

  $effect(() => {
    const onMousemove = (e) => dragMove(e.clientX, e.clientY)
    const onTouchmove = (e) => {
      if (!dragging) return
      dragMove(e.touches[0].clientX, e.touches[0].clientY)
      e.preventDefault()
    }
    const onMouseup = () => dragEnd()
    const onTouchend = () => dragEnd()

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
    document.addEventListener('touchmove', onTouchmove, { passive: false })
    document.addEventListener('touchend', onTouchend)

    return () => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
      document.removeEventListener('touchmove', onTouchmove)
      document.removeEventListener('touchend', onTouchend)
    }
  })

  return {
    get windowEl() { return windowEl },
    set windowEl(v) { windowEl = v },
    get titleBarEl() { return titleBarEl },
    set titleBarEl(v) { titleBarEl = v },
    onTitleMousedown,
    onTitleTouchstart,
  }
}
