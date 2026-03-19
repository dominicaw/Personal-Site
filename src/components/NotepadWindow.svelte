<script>
  import { cv } from '../lib/cv.js'
  import Window from './Window.svelte'
  import MenuBar from './MenuBar.svelte'

  let { title = 'Notepad', filename = 'untitled.txt', onminimize = () => {}, onclose = () => {} } = $props()
</script>

<Window title="{filename} - {title}" id="notepad" top="36px" left="120px" width="580px" maxWidth="calc(100vw - 130px)" {onminimize} {onclose}>
  <MenuBar label="Notepad menu" items={['File', 'Edit', 'Search', 'Help']} />
  <textarea
    readonly
    aria-label="Dominica Wannenburg — CV"
    spellcheck="false"
    value={cv}
  ></textarea>
</Window>

<style>
  textarea {
    width: 100%;
    height: 440px;
    line-height: 1.5;
    border: none;
    border-top: 2px inset #c0c0c0;
    resize: none;
    padding: 6px 10px;
    outline: none;
    overflow-y: scroll;
    cursor: text;
  }

  @media (max-width: 680px) {
    textarea {
      height: calc(100svh - 132px);
    }
  }
</style>
