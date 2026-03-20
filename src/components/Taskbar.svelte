<script>
  import Clock from './Clock.svelte'

  let { windows = [], onstartclick = () => {} } = $props()

  const startupSound = new Audio('/sound/start-up.mp3')
  let clickCount = $state(0)

  function handleStartClick() {
    clickCount++
    if (clickCount >= 5) {
      clickCount = 0
      if (startupSound.paused) startupSound.play()
    }
    onstartclick()
  }
</script>

<footer class="taskbar" aria-label="Taskbar">
  <button class="start-btn" onclick={() => handleStartClick()} aria-label="Start" aria-expanded="false">
    <img
      src="/icons/windows.png"
      alt="start"
      width="16"
      height="16"
      aria-hidden="true"
    />
    Start
  </button>

  <div class="taskbar-divider" aria-hidden="true"></div>

  <div class="taskbar-windows" role="group" aria-label="Open windows">
    {#each windows as win (win.id)}
      <button
        class="taskbar-win-btn"
        class:active={win.active}
        aria-pressed={win.active}
        onclick={() => win.onclick()}
      >
        {win.label}
      </button>
    {/each}
  </div>

  <div class="taskbar-tray" role="status" aria-label="System tray">
    <Clock />
  </div>
</footer>

<style>
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 32px;
    background: #c0c0c0;
    border-top: 2px solid #ffffff;
    box-shadow: inset 0 1px 0 #dfdfdf;
    display: flex;
    align-items: center;
    padding: 2px 4px;
    gap: 4px;
    z-index: 1000;
  }

  .start-btn {
    height: 22px;
    padding: 0 8px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .taskbar-divider {
    width: 0;
    height: 20px;
    border-left: 1px solid #808080;
    border-right: 1px solid #ffffff;
    margin: 0 2px;
    flex-shrink: 0;
  }

  .taskbar-windows {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 2px;
    overflow: hidden;
    min-width: 0;
  }

  .taskbar-win-btn {
    height: 22px;
    min-width: 130px;
    max-width: 200px;
    padding: 0 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .taskbar-win-btn.active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #dfdfdf;
  }

  .taskbar-tray {
    height: 22px;
    padding: 0 10px;
    border: 1px solid;
    border-color: #808080 #ffffff #ffffff #808080;
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>
