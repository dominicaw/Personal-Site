export function createWindowState(initial = false) {
  let visible = $state(initial)
  let minimized = $state(false)

  return {
    get visible() { return visible },
    get minimized() { return minimized },
    get shown() { return visible && !minimized },
    open() { visible = true; minimized = false },
    close() { visible = false; minimized = false },
    minimize() { minimized = true; visible = false },
    toggle() {
      if (minimized || !visible) {
        minimized = false
        visible = true
      } else {
        minimized = true
        visible = false
      }
    },
  }
}
