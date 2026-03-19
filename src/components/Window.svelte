<script>
  import { createDraggable } from '../lib/draggable.svelte.js'

  let {
    title,
    id,
    top = '8px',
    left = '8px',
    width = 'calc(100vw - 16px)',
    maxWidth = 'none',
    onminimize = () => {},
    onclose = () => {},
    children,
  } = $props()

  const drag = createDraggable()

  const style = $derived(
    `position:absolute;top:${top};left:${left};width:${width};max-width:${maxWidth};z-index:10`
  )
</script>

<div
  class="window win"
  {style}
  bind:this={drag.windowEl}
  role="dialog"
  aria-labelledby="{id}-title"
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
    <div class="title-bar-text" id="{id}-title">{title}</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => onminimize()}></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close" onclick={() => onclose()}></button>
    </div>
  </div>

  <div class="window-body body">
    {@render children()}
  </div>
</div>

<style>
  .title-bar {
    cursor: move;
    user-select: none;
  }

  .body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 680px) {
    .win {
      top: 8px !important;
      left: 8px !important;
      width: calc(100vw - 16px) !important;
      max-width: none !important;
    }
  }
</style>
