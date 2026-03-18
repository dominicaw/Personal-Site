<script>
  import { onMount, onDestroy } from 'svelte'

  let time = $state('')
  let iso = $state('')

  function tick() {
    const now = new Date()
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    time = `${h}:${m}`
    iso = now.toISOString()
  }

  let interval

  onMount(() => {
    tick()
    interval = setInterval(tick, 10_000)
  })

  onDestroy(() => clearInterval(interval))
</script>

<time datetime={iso} aria-label="Current time: {time}">{time}</time>
