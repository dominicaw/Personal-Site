<script>
  import { onMount } from 'svelte'
  import { cv } from './cv.js'

  let { title = 'Notepad', filename = 'untitled.txt', onminimize = () => {}, onclose = () => {} } = $props()

  let windowEl = $state(null)
  let titleBarEl = $state(null)

  // Dragging state
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

  onMount(() => {
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
</script>

<div
  class="window notepad-window"
  bind:this={windowEl}
  role="dialog"
  aria-labelledby="notepad-title"
  aria-modal="false"
>
  <div
    class="title-bar"
    role="toolbar"
    aria-label="Window controls"
    tabindex="-1"
    bind:this={titleBarEl}
    onmousedown={onTitleMousedown}
    ontouchstart={onTitleTouchstart}
  >
    <div class="title-bar-text" id="notepad-title">{filename} - {title}</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => onminimize()}></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close" onclick={() => onclose()}></button>
    </div>
  </div>

  <div class="window-body notepad-body">
    <nav class="notepad-menubar" aria-label="Notepad menu">
      <ul role="menubar">
        <li role="none"><button role="menuitem" tabindex="-1">File</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Edit</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Search</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Help</button></li>
      </ul>
    </nav>
    <textarea
      readonly
      aria-label="Dominica Wannenburg — CV"
      spellcheck="false"
      value={cv}
    ></textarea>
  </div>
</div>

<style>
  .notepad-window {
    position: absolute;
    top: 36px;
    left: 120px;
    width: 580px;
    max-width: calc(100vw - 130px);
    z-index: 10;
  }

  .title-bar {
    cursor: move;
    user-select: none;
  }

  .notepad-body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    background: white;
  }

  /* Menu bar */
  .notepad-menubar {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .notepad-menubar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1px 2px;
    gap: 0;
  }

  .notepad-menubar button {
    background: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    padding: 2px 8px;
    font-size: 11px;
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', Arial, sans-serif;
    cursor: default;
    line-height: 1.4;
  }

  .notepad-menubar button:hover,
  .notepad-menubar button:focus {
    background: #000080;
    color: white;
    border-color: transparent;
    outline: none;
  }

  /* Textarea */
  textarea {
    width: 100%;
    height: 440px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    line-height: 1.5;
    border: none;
    border-top: 2px inset #c0c0c0;
    resize: none;
    background: #ffffff;
    color: #000000;
    padding: 6px 10px;
    outline: none;
    overflow-y: scroll;
    cursor: text;
  }

  /* Responsive */
  @media (max-width: 680px) {
    .notepad-window {
      top: 8px;
      left: 8px;
      width: calc(100vw - 16px);
      max-width: none;
    }

    textarea {
      height: calc(100svh - 130px);
    }
  }
</style>
