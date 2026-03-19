<script>
  import { createDraggable } from '../lib/draggable.svelte.js'

  let { onminimize = () => {}, onclose = () => {} } = $props()

  const drag = createDraggable()

  const DIAL_UP_DURATION = 26_000 // ms
  let loading = $state(true)
  let progress = $state(0)

  $effect(() => {
    const audio = new Audio('/sound/dial-up.mp3')
    audio.play()

    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      progress = Math.min((elapsed / DIAL_UP_DURATION) * 100, 100)
      if (elapsed >= DIAL_UP_DURATION) {
        clearInterval(interval)
        loading = false
      }
    }, 200)

    return () => {
      audio.pause()
      clearInterval(interval)
    }
  })
</script>

<div
  class="window ie-window"
  bind:this={drag.windowEl}
  role="dialog"
  aria-labelledby="ie-title"
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
    <div class="title-bar-text" id="ie-title">Microsoft Internet Explorer</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => onminimize()}></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close" onclick={() => onclose()}></button>
    </div>
  </div>

  <div class="window-body ie-body">
    <nav class="ie-menubar" aria-label="IE menu">
      <ul role="menubar">
        <li role="none"><button role="menuitem" tabindex="-1">File</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Edit</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">View</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Favorites</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Tools</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Help</button></li>
      </ul>
    </nav>

    <div class="address-bar" aria-label="Address bar">
      <span class="address-label">Address</span>
      <div class="address-input" role="textbox" aria-readonly="true" aria-label="Current URL">
        {loading ? 'Connecting...' : 'about:dominica'}
      </div>
      <button class="go-btn" tabindex="-1">Go</button>
    </div>

    <div class="ie-content" aria-live="polite">
      {#if loading}
        <div class="connecting">
          <p class="connecting-text">Connecting to the internet...</p>
          <div class="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100" aria-label="Loading">
            <div class="progress-fill" style="width: {progress}%"></div>
          </div>
          <p class="progress-label">{Math.round(progress)}%</p>
        </div>
      {:else}
        <div class="page-content">
          <h1>Welcome to the Internet</h1>
          <p>You've got mail.</p>
        </div>
      {/if}
    </div>

    <div class="ie-statusbar" role="status">
      {loading ? 'Connecting...' : 'Done'}
    </div>
  </div>
</div>

<style>
  .ie-window {
    position: absolute;
    top: 40px;
    left: 160px;
    width: 620px;
    max-width: calc(100vw - 16px);
    z-index: 10;
  }

  .title-bar {
    cursor: move;
    user-select: none;
  }

  .ie-body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    background: white;
  }

  /* Menu bar */
  .ie-menubar {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .ie-menubar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1px 2px;
    gap: 0;
  }

  .ie-menubar button {
    background: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    padding: 2px 8px;
    line-height: 1.4;
  }

  .ie-menubar button:hover,
  .ie-menubar button:focus {
    background: #000080;
    color: white;
    border-color: transparent;
    outline: none;
  }

  /* Address bar */
  .address-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 4px;
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .address-label {
    white-space: nowrap;
  }

  .address-input {
    flex: 1;
    background: white;
    box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
    padding: 1px 4px;
    height: 20px;
    display: flex;
    align-items: center;
  }

  .go-btn {
    min-width: 0;
    padding: 0 8px;
    height: 20px;
  }

  /* Content area */
  .ie-content {
    flex: 1;
    overflow-y: auto;
    min-height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }

  /* Loading state */
  .connecting {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 40px;
  }

  .connecting-text {
    margin: 0;
    font-size: 13px;
  }

  .progress-track {
    width: 300px;
    height: 16px;
    background: #dfdfdf;
    box-shadow: inset 1px 1px #808080, inset -1px -1px #fff;
  }

  .progress-fill {
    height: 100%;
    background: #000080;
    transition: width 0.1s linear;
  }

  .progress-label {
    margin: 0;
    font-size: 11px;
  }

  /* Page content */
  .page-content {
    text-align: center;
    padding: 40px;
  }

  .page-content h1 {
    font-size: 18px;
    margin: 0 0 12px;
  }

  .page-content p {
    font-size: 13px;
    margin: 0;
  }

  /* Status bar */
  .ie-statusbar {
    padding: 2px 6px;
    border-top: 1px solid #808080;
    background: #c0c0c0;
    flex-shrink: 0;
  }

  @media (max-width: 680px) {
    .ie-window {
      top: 8px;
      left: 8px;
      width: calc(100vw - 16px);
    }

    .ie-content {
      min-height: calc(100svh - 200px);
    }
  }
</style>
