export function useElementScreenPosition(target: any) {
  const { x: targetX, y: targetY, update: targetUpdate } = useElementBounding(target)
  const { x: screenX, y: screenY } = useWindowBounding()
  const x = computed(() => {
    return targetX.value + screenX.value
  })
  const y = computed(() => {
    return targetY.value + screenY.value
  })

  function update() {
    targetUpdate()
  }

  return {
    x,
    y,
    update
  }
}
