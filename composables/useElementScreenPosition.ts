export function useElementScreenPosition(target: any) {
  const { x: targetX, y: targetY, update: targetUpdate } = useElementBounding(target)
  const { x: screenX, y: screenY } = useWindowBounding()
  const x = computed(() => {
    return targetX.value + screenX.value
  })
  const y = computed(() => {
    return targetY.value + screenY.value
  })

  const offsetX = computed(()=> screenX.value - targetX.value)
  const offsetY = computed(()=> screenY.value - targetY.value)

  function update() {
    targetUpdate()
  }

  return {
    x,
    y,
    targetX,
    targetY,
    offsetX,
    offsetY,
    screenX,
screenY,
    update
  }
}
