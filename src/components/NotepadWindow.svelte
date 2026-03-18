<script>
  import { cv } from '../lib/cv.js'
  import { createDraggable } from '../lib/draggable.svelte.js'

  let { title = 'Notepad', filename = 'untitled.txt', onminimize = () => {}, onclose = () => {} } = $props()

  const drag = createDraggable()
</script>

<div
  class="window notepad-window"
  bind:this={drag.windowEl}
  role="dialog"
  aria-labelledby="notepad-title"
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
    line-height: 1.5;
    border: none;
    border-top: 2px inset #c0c0c0;
    resize: none;
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
