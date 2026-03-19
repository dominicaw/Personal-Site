<script>
  let time = $state('')
  let iso = $state('')

  function tick() {
    const now = new Date()
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    time = `${h}:${m}`
    iso = now.toISOString()
  }

  $effect(() => {
    tick()
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000
    const timeout = setTimeout(() => {
      tick()
      const interval = setInterval(tick, 60_000)
      cleanup = () => clearInterval(interval)
    }, msUntilNextMinute)
    let cleanup = () => clearTimeout(timeout)
    return () => cleanup()
  })
</script>

<time datetime={iso} aria-label="Current time: {time}">{time}</time>
