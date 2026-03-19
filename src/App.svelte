<script>
  import NotepadWindow from './components/NotepadWindow.svelte'
  import RecycleBinWindow from './components/RecycleBinWindow.svelte'
  import IEWindow from './components/IEWindow.svelte'
  import PaintWindow from './components/PaintWindow.svelte'
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

  const dialUpAudio = new Audio('/sound/dial-up.mp3')

  let ieVisible = $state(false)
  let ieMinimized = $state(false)

  function openIE() {
    ieMinimized = false
    ieVisible = true
  }

  function toggleIE() {
    if (ieMinimized || !ieVisible) {
      ieMinimized = false
      ieVisible = true
    } else {
      ieMinimized = true
      ieVisible = false
    }
  }

  let paintVisible = $state(false)
  let paintMinimized = $state(false)

  function togglePaint() {
    if (paintMinimized || !paintVisible) {
      paintMinimized = false
      paintVisible = true
    } else {
      paintMinimized = true
      paintVisible = false
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
    ...(ieVisible ? [{
      id: 'ie',
      label: 'Microsoft Internet Explorer',
      active: ieVisible && !ieMinimized,
      onclick: toggleIE,
    }] : []),
    ...(paintVisible ? [{
      id: 'paint',
      label: 'untitled - Paint',
      active: paintVisible && !paintMinimized,
      onclick: togglePaint,
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
      <DesktopIcon label="Internet Explorer" onclick={openIE}>
        <img src="/icons/msie.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Paint" onclick={togglePaint}>
        <img src="/icons/paint_old.png" alt="" width="32" height="32" />
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

  {#if ieVisible && !ieMinimized}
    <IEWindow
      audio={dialUpAudio}
      onminimize={() => { ieMinimized = true; ieVisible = false }}
      onclose={() => { ieVisible = false; ieMinimized = false }}
    />
  {/if}

  {#if paintVisible && !paintMinimized}
    <PaintWindow
      onminimize={() => { paintMinimized = true; paintVisible = false }}
      onclose={() => { paintVisible = false; paintMinimized = false }}
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
