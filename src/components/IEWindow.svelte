<script>
  import Window from './Window.svelte'
  import MenuBar from './MenuBar.svelte'

  let { audio, onminimize = () => {}, onclose = () => {} } = $props()

  const DIAL_UP_DURATION = 26_000 // ms
  let loading = $state(true)
  let progress = $state(0)

  $effect(() => {
    audio.currentTime = 0
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

<Window title="Microsoft Internet Explorer" id="ie" top="40px" left="160px" width="620px" maxWidth="calc(100vw - 16px)" {onminimize} {onclose}>
  <MenuBar label="IE menu" items={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']} />

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
        <img src="/images/rick.gif" alt="Rick Astley" class="rick-gif" />
      </div>
    {/if}
  </div>

  <div class="ie-statusbar" role="status">
    {loading ? 'Connecting...' : 'Done'}
  </div>
</Window>

<style>
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
    padding: 0;
    width: 100%;
  }

  .rick-gif {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Status bar */
  .ie-statusbar {
    padding: 2px 6px;
    border-top: 1px solid #808080;
    background: #c0c0c0;
    flex-shrink: 0;
  }

  @media (max-width: 680px) {
    .ie-content {
      min-height: calc(100svh - 200px);
    }
  }
</style>
