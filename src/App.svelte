<script>
  import NotepadWindow from './components/NotepadWindow.svelte'
  import RecycleBinWindow from './components/RecycleBinWindow.svelte'
  import IEWindow from './components/IEWindow.svelte'
  import PaintWindow from './components/PaintWindow.svelte'
  import DesktopIcon from './components/DesktopIcon.svelte'
  import Taskbar from './components/Taskbar.svelte'
  import { createWindowState } from './lib/window-state.svelte.js'

  const notepad = createWindowState(true)
  const recycle = createWindowState()
  const ie = createWindowState()
  const paint = createWindowState()

  const dialUpAudio = new Audio('/sound/dial-up.mp3')

  const taskbarWindows = $derived([
    { id: 'notepad', label: 'dominicaw.txt - Notepad', active: notepad.shown, onclick: notepad.toggle },
    ...(recycle.visible ? [{ id: 'recycle', label: 'Recycle Bin', active: recycle.shown, onclick: recycle.toggle }] : []),
    ...(ie.visible ? [{ id: 'ie', label: 'Microsoft Internet Explorer', active: ie.shown, onclick: ie.toggle }] : []),
    ...(paint.visible ? [{ id: 'paint', label: 'untitled - Paint', active: paint.shown, onclick: paint.toggle }] : []),
  ])
</script>

<main class="desktop" aria-label="Desktop">
  <ul class="desktop-icons" aria-label="Desktop icons">
    <li>
      <DesktopIcon label="dominicaw.txt" onclick={notepad.toggle}>
        <img src="/icons/notepad_file.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Internet Explorer" onclick={ie.open}>
        <img src="/icons/msie.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Paint" onclick={paint.toggle}>
        <img src="/icons/paint_old.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
    <li>
      <DesktopIcon label="Recycle Bin" onclick={recycle.toggle}>
        <img src="/icons/recycle_bin.png" alt="" width="32" height="32" />
      </DesktopIcon>
    </li>
  </ul>

  {#if notepad.shown}
    <NotepadWindow
      title="Notepad"
      filename="dominicaw.txt"
      onminimize={notepad.minimize}
      onclose={notepad.close}
    />
  {/if}

  {#if recycle.shown}
    <RecycleBinWindow
      onminimize={recycle.minimize}
      onclose={recycle.close}
    />
  {/if}

  {#if ie.shown}
    <IEWindow
      audio={dialUpAudio}
      onminimize={ie.minimize}
      onclose={ie.close}
    />
  {/if}

  {#if paint.shown}
    <PaintWindow
      onminimize={paint.minimize}
      onclose={paint.close}
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
