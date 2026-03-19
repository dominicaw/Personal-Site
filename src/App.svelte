<script>
  import NotepadWindow from './components/NotepadWindow.svelte'
  import RecycleBinWindow from './components/RecycleBinWindow.svelte'
  import IEWindow from './components/IEWindow.svelte'
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

  const DIAL_UP_DURATION = 26_000 // ms

  let ieVisible = $state(false)
  let ieMinimized = $state(false)
  let ieLoading = $state(true)
  let ieProgress = $state(0)
  let ieAudio = null
  let ieInterval = null

  function stopIEAudio() {
    if (ieAudio) { ieAudio.pause(); ieAudio = null }
    if (ieInterval) { clearInterval(ieInterval); ieInterval = null }
  }

  function openIE() {
    stopIEAudio()
    ieLoading = true
    ieProgress = 0
    ieMinimized = false
    ieVisible = true

    ieAudio = new Audio('/sound/dial-up.mp3')
    ieAudio.play()

    const start = Date.now()
    ieInterval = setInterval(() => {
      const elapsed = Date.now() - start
      ieProgress = Math.min((elapsed / DIAL_UP_DURATION) * 100, 100)
      if (elapsed >= DIAL_UP_DURATION) {
        stopIEAudio()
        ieLoading = false
      }
    }, 200)
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
      loading={ieLoading}
      progress={ieProgress}
      onminimize={() => { ieMinimized = true; ieVisible = false }}
      onclose={() => { stopIEAudio(); ieVisible = false; ieMinimized = false }}
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
