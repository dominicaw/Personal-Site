<script>
  let { label, onclick = () => {}, children } = $props()
  const handleClick = (e) => onclick(e)
</script>

<button class="desktop-icon" aria-label={label} onclick={handleClick}>
  <span class="icon-img" aria-hidden="true">
    {@render children()}
  </span>
  <span class="icon-label">{label}</span>
</button>

<style>
  .desktop-icon {
    background: transparent;
    border: 1px dotted transparent;
    box-shadow: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    width: 76px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(0, 0, 0, 0.5);
  }

  .desktop-icon:hover,
  .desktop-icon:focus {
    border-color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 128, 0.45);
    outline: none;
  }

  .desktop-icon:active {
    background: rgba(0, 0, 128, 0.65);
  }

  .icon-img {
    display: block;
    width: 32px;
    height: 32px;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
  }

  .icon-img :global(img) {
    width: 32px;
    height: 32px;
  }

  .icon-label {
    text-align: center;
    line-height: 1.3;
    color: white;
    word-break: break-word;
  }
</style>
