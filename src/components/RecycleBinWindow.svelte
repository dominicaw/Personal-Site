<script>
  import { createDraggable } from '../lib/draggable.svelte.js'

  let { onminimize = () => {}, onclose = () => {} } = $props()

  const drag = createDraggable()

  const files = [
    { name: 'work_life_balance.exe', size: '0 KB', type: 'Application', icon: '⚙️' },
    { name: 'free_time.doc', size: '1 KB', type: 'Document', icon: '📄' },
    { name: 'sleep_schedule.xls', size: '2 KB', type: 'Spreadsheet', icon: '📊' },
    { name: 'social_life.lnk', size: '1 KB', type: 'Shortcut', icon: '🔗' },
    { name: 'gym_membership.url', size: '1 KB', type: 'URL', icon: '🌐' },
    { name: 'imposter_syndrome.dll', size: '999 KB', type: 'System file', icon: '⚙️' },
  ]
</script>

<div
  class="window recycle-window"
  bind:this={drag.windowEl}
  role="dialog"
  aria-labelledby="recycle-title"
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
    <div class="title-bar-text" id="recycle-title">Recycle Bin</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => onminimize()}></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close" onclick={() => onclose()}></button>
    </div>
  </div>

  <div class="window-body recycle-body">
    <nav class="explorer-menubar" aria-label="Explorer menu">
      <ul role="menubar">
        <li role="none"><button role="menuitem" tabindex="-1">File</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Edit</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">View</button></li>
        <li role="none"><button role="menuitem" tabindex="-1">Help</button></li>
      </ul>
    </nav>

    <div class="address-bar" aria-label="Address">
      <span class="address-label">Address</span>
      <div class="address-input" role="textbox" aria-readonly="true" aria-label="Current location">
        <img src="/icons/recycle_bin.png" alt="" width="16" height="16" />
        Recycle Bin
      </div>
    </div>

    <table class="file-list" aria-label="Recycle Bin contents">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Size</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        {#each files as file}
          <tr>
            <td><span aria-hidden="true">{file.icon}</span> {file.name}</td>
            <td>{file.size}</td>
            <td>{file.type}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="status-bar" role="status">
      {files.length} object(s)
    </div>
  </div>
</div>

<style>
  .recycle-window {
    position: absolute;
    top: 60px;
    left: 200px;
    width: 480px;
    max-width: calc(100vw - 16px);
    z-index: 10;
  }

  .title-bar {
    cursor: move;
    user-select: none;
  }

  .recycle-body {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    background: white;
  }

  /* Menu bar */
  .explorer-menubar {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .explorer-menubar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1px 2px;
    gap: 0;
  }

  .explorer-menubar button {
    background: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    padding: 2px 8px;
    line-height: 1.4;
  }

  .explorer-menubar button:hover,
  .explorer-menubar button:focus {
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
    font-size: 11px;
    white-space: nowrap;
  }

  .address-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    background: white;
    box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
    padding: 1px 4px;
    font-size: 11px;
    height: 20px;
  }

  /* File list */
  .file-list {
    flex: 1;
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }

  .file-list th {
    text-align: left;
    padding: 2px 8px;
    border-right: 1px solid #808080;
    white-space: nowrap;
    position: sticky;
    top: 0;
  }

  .file-list td {
    padding: 2px 8px;
    border-bottom: 1px solid #dfdfdf;
    white-space: nowrap;
  }

  .file-list tbody tr:hover {
    background: #000080;
    color: white;
  }

  /* Status bar */
  .status-bar {
    font-size: 11px;
    padding: 2px 6px;
    border-top: 1px solid #808080;
    background: #c0c0c0;
    flex-shrink: 0;
  }

  @media (max-width: 680px) {
    .recycle-window {
      top: 8px;
      left: 8px;
      width: calc(100vw - 16px);
    }
  }
</style>
