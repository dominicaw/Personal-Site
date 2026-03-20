<script>
  import Window from './Window.svelte'
  import MenuBar from './MenuBar.svelte'

  let { onminimize = () => {}, onclose = () => {} } = $props()

  const files = [
    { name: 'work_life_balance.exe', size: '0 KB', type: 'Application', icon: '/icons/executable.png' },
    { name: 'free_time.doc', size: '1 KB', type: 'Document', icon: '/icons/notepad_file.png' },
    { name: 'sleep_schedule.xls', size: '2 KB', type: 'Spreadsheet', icon: '/icons/chart.png' },
    { name: 'social_life.lnk', size: '1 KB', type: 'Shortcut', icon: '/icons/computer_gear.png' },
    { name: 'gym_membership.url', size: '1 KB', type: 'URL', icon: '/icons/url.png' },
    { name: 'imposter_syndrome.dll', size: '999 KB', type: 'System file', icon: '/icons/executable.png' },
  ]
</script>

<Window title="Recycle Bin" id="recycle" top="60px" left="200px" width="480px" maxWidth="calc(100vw - 16px)" {onminimize} {onclose}>
  <MenuBar label="Explorer menu" items={['File', 'Edit', 'View', 'Help']} />

  <div class="address-bar" aria-label="Address">
    <span class="address-label">Address</span>
    <div class="address-input" role="textbox" aria-readonly="true" aria-label="Current location">
      <img src="/icons/recycle_bin.png" alt="recycle_bin" width="16" height="16" />
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
          <td><img src={file.icon} alt={file.name} aria-hidden="true" /> <span>{file.name}</span></td>
          <td>{file.size}</td>
          <td>{file.type}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="status-bar" role="status">
    {files.length} object(s)
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
    vertical-align: middle;
  }

  .file-list td img {
    vertical-align: middle;
    margin-right: 5px;
    height: 16px;
    width: 16px;
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
</style>
