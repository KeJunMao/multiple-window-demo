export function useWindowBounding() {
  const { width, height } = useWindowSize()
  const x = ref(0)
  const y = ref(0)
  const left = ref(0)
  const top = ref(0)
  const update = () => {
    if (window) {
      x.value = window.screenX
      y.value = window.screenY
      left.value = window.screenLeft
      top.value = window.screenTop
    }
  }

  useRafFn(update)

  return {
    width,
    height,
    x,
    y,
    left,
    top
  }
}
