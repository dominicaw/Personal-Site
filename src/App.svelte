<script>
  import NotepadWindow from './lib/NotepadWindow.svelte'
  import DesktopIcon from './lib/DesktopIcon.svelte'
  import Taskbar from './lib/Taskbar.svelte'

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

  const taskbarWindows = $derived([
    {
      id: 'notepad',
      label: 'dominicaw.txt - Notepad',
      active: notepadVisible && !notepadMinimized,
      onclick: toggleNotepad,
    },
  ])
</script>

<main class="desktop" aria-label="Desktop">
  <ul class="desktop-icons" aria-label="Desktop icons">
    <li>
      <DesktopIcon label="dominicaw.txt" onclick={toggleNotepad}>
        <img src="/icons/notepad.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Recycle Bin">
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

  @media (max-width: 680px) {
    .desktop-icons {
      display: none;
    }
  }
</style>
