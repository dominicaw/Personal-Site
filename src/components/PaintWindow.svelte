<script>
  import { createDraggable } from '../lib/draggable.svelte.js'

  let { onminimize = () => {}, onclose = () => {} } = $props()

  const drag = createDraggable()

  let canvas = $state(null)
  let drawing = $state(false)
  let color = $state('#000000')
  let brushSize = $state(3)

  const palette = [
    '#000000', '#808080', '#800000', '#808000',
    '#008000', '#008080', '#000080', '#800080',
    '#ffffff', '#c0c0c0', '#ff0000', '#ffff00',
    '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  ]

  function getCtx() {
    return canvas?.getContext('2d')
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  function startDraw(e) {
    drawing = true
    const ctx = getCtx()
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  function draw(e) {
    if (!drawing) return
    e.preventDefault()
    const ctx = getCtx()
    const pos = getPos(e)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  function stopDraw() {
    drawing = false
  }

  function clearCanvas() {
    const ctx = getCtx()
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  $effect(() => {
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  })
</script>

<div
  class="window paint-window"
  bind:this={drag.windowEl}
  role="dialog"
  aria-labelledby="paint-title"
  aria-modal="false"
>
  <div
    class="title-bar"
    role="toolbar"
    aria-label="Window controls"
    tabindex="-1"
    bind:this={drag.titleBarEl}
    onmousedown={drag.onTitleMousedown}
    ontouchstart={drag.onTitleTouchstart}
  >
    <div class="title-bar-text" id="paint-title">untitled - Paint</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => onminimize()}></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close" onclick={() => onclose()}></button>
    </div>
  </div>

  <div class="window-body paint-body">
    <nav class="paint-menubar" aria-label="Paint menu">
      <ul role="menubar">
        <li role="none"><button role="menuitem" tabindex="-1">File</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Edit</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">View</button></li>
        <li role="none"><button role="menuitem" tabindex="-1" onclick={clearCanvas}>Image</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Help</button></li>
      </ul>
    </nav>

    <div class="paint-workspace">
      <div class="paint-toolbox">
        <div class="tool-grid">
          <button class="tool-btn active" aria-label="Pencil" title="Pencil">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M12.1 1.5l2.4 2.4-9.8 9.8-3.2.8.8-3.2z"/>
            </svg>
          </button>
        </div>
        <div class="size-picker">
          {#each [1, 3, 5, 8] as size}
            <button
              class="size-btn"
              class:active={brushSize === size}
              onclick={() => brushSize = size}
              aria-label="Brush size {size}"
            >
              <span class="size-dot" style="width:{Math.min(size + 2, 10)}px;height:{Math.min(size + 2, 10)}px"></span>
            </button>
          {/each}
        </div>
      </div>

      <div class="canvas-area">
        <canvas
          bind:this={canvas}
          width="540"
          height="340"
          onmousedown={startDraw}
          onmousemove={draw}
          onmouseup={stopDraw}
          onmouseleave={stopDraw}
          ontouchstart={startDraw}
          ontouchmove={draw}
          ontouchend={stopDraw}
        ></canvas>
      </div>
    </div>

    <div class="paint-palette" aria-label="Color palette">
      <div class="current-colors">
        <div class="color-fg" style="background:{color}"></div>
      </div>
      <div class="color-grid">
        {#each palette as c}
          <button
            class="color-swatch"
            class:active={color === c}
            style="background:{c}"
            onclick={() => color = c}
            aria-label="Color {c}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .paint-window {
    position: absolute;
    top: 30px;
    left: 100px;
    width: 660px;
    max-width: calc(100vw - 16px);
    z-index: 10;
  }

  .title-bar {
    cursor: move;
    user-select: none;
  }

  .paint-body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    background: #c0c0c0;
  }

  /* Menu bar */
  .paint-menubar {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .paint-menubar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1px 2px;
    gap: 0;
  }

  .paint-menubar button {
    background: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    padding: 2px 8px;
    line-height: 1.4;
  }

  .paint-menubar button:hover,
  .paint-menubar button:focus {
    background: #000080;
    color: white;
    border-color: transparent;
    outline: none;
  }

  /* Workspace layout */
  .paint-workspace {
    display: flex;
    flex: 1;
  }

  /* Toolbox */
  .paint-toolbox {
    width: 52px;
    flex-shrink: 0;
    background: #c0c0c0;
    border-right: 1px solid #808080;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tool-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .tool-btn {
    width: 28px;
    height: 28px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  .tool-btn.active {
    box-shadow: inset 1px 1px #808080, inset -1px -1px #fff;
    background: #dfdfdf;
  }

  .size-picker {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
  }

  .size-btn {
    width: 28px;
    height: 14px;
    padding: 0;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .size-btn.active {
    box-shadow: inset 1px 1px #808080, inset -1px -1px #fff;
    background: #dfdfdf;
  }

  .size-dot {
    display: block;
    background: #000;
    border-radius: 50%;
  }

  /* Canvas */
  .canvas-area {
    flex: 1;
    overflow: auto;
    background: #808080;
    padding: 2px;
  }

  canvas {
    display: block;
    cursor: crosshair;
    background: white;
    touch-action: none;
  }

  /* Palette */
  .paint-palette {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background: #c0c0c0;
    border-top: 1px solid #808080;
    flex-shrink: 0;
  }

  .current-colors {
    position: relative;
    width: 28px;
    height: 28px;
    margin-right: 4px;
  }

  .color-fg {
    width: 20px;
    height: 20px;
    border: 1px solid #808080;
    position: absolute;
    top: 0;
    left: 0;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(8, 16px);
    grid-template-rows: repeat(2, 16px);
    gap: 1px;
  }

  .color-swatch {
    width: 16px;
    height: 16px;
    padding: 0;
    min-width: 0;
    min-height: 0;
    border: 1px solid #808080;
    box-shadow: none;
    cursor: pointer;
  }

  .color-swatch.active {
    border: 2px solid #000;
  }

  @media (max-width: 680px) {
    .paint-window {
      top: 8px;
      left: 8px;
      width: calc(100vw - 16px);
    }

    .paint-toolbox {
      width: 36px;
      padding: 2px;
    }

    .tool-btn {
      width: 24px;
      height: 24px;
    }

    .size-btn {
      width: 24px;
    }

    canvas {
      width: 100%;
      height: auto;
    }

    .color-grid {
      grid-template-columns: repeat(8, 14px);
      grid-template-rows: repeat(2, 14px);
    }

    .color-swatch {
      width: 14px;
      height: 14px;
    }
  }
</style>
