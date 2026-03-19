<script>
  let { items = [], label = 'Menu' } = $props()
</script>

<nav class="menubar" aria-label={label}>
  <ul role="menubar">
    {#each items as item}
      <li role="none">
        <button role="menuitem" tabindex="-1" onclick={item.onclick}>
          {item.label ?? item}
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .menubar {
    background: #c0c0c0;
    border-bottom: 1px solid #808080;
    flex-shrink: 0;
  }

  .menubar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1px 2px;
    gap: 0;
  }

  .menubar button {
    background: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    padding: 2px 8px;
    line-height: 1.4;
  }

  .menubar button:hover,
  .menubar button:focus {
    background: #000080;
    color: white;
    border-color: transparent;
    outline: none;
  }
</style>
