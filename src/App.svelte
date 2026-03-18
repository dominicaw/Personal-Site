<script>
  import NotepadWindow from './components/NotepadWindow.svelte'
  import RecycleBinWindow from './components/RecycleBinWindow.svelte'
  import DesktopIcon from './components/DesktopIcon.svelte'
  import Taskbar from './components/Taskbar.svelte'

  let notepadVisible = $state(true)
  let notepadMinimized = $state(false)

  function toggleNotepad() {
    if (notepadMinimized || !notepadVisible) {
      notepadMinimized = false
      notepadVisible = true
    } else {
      notepadMinimized = true
      notepadVisible = false
    }
  }

  let recycleVisible = $state(false)
  let recycleMinimized = $state(false)

  function toggleRecycle() {
    if (recycleMinimized || !recycleVisible) {
      recycleMinimized = false
      recycleVisible = true
    } else {
      recycleMinimized = true
      recycleVisible = false
    }
  }

  const taskbarWindows = $derived([
    {
      id: 'notepad',
      label: 'dominicaw.txt - Notepad',
      active: notepadVisible && !notepadMinimized,
      onclick: toggleNotepad,
    },
    ...(recycleVisible ? [{
      id: 'recycle',
      label: 'Recycle Bin',
      active: recycleVisible && !recycleMinimized,
      onclick: toggleRecycle,
    }] : []),
  ])
</script>

<main class="desktop" aria-label="Desktop">
  <ul class="desktop-icons" aria-label="Desktop icons">
    <li>
      <DesktopIcon label="dominicaw.txt" onclick={toggleNotepad}>
        <img src="/icons/notepad_file.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Recycle Bin" onclick={toggleRecycle}>
        <img src="/icons/recycle_bin.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
  </ul>

  {#if notepadVisible && !notepadMinimized}
    <NotepadWindow
      title="Notepad"
      filename="dominicaw.txt"
      onminimize={() => { notepadMinimized = true; notepadVisible = false }}
      onclose={() => { notepadVisible = false; notepadMinimized = false }}
    />
  {/if}

  {#if recycleVisible && !recycleMinimized}
    <RecycleBinWindow
      onminimize={() => { recycleMinimized = true; recycleVisible = false }}
      onclose={() => { recycleVisible = false; recycleMinimized = false }}
    />
  {/if}
</main>

<Taskbar windows={taskbarWindows} />

<style>
  .desktop {
    position: fixed;
    inset: 0 0 28px 0;
    overflow: hidden;
    background: #008080;
  }

  .desktop-icons {
    position: absolute;
    top: 14px;
    left: 14px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    z-index: 5;
  }

</style>
