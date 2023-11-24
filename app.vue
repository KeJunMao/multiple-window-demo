<script setup lang="ts">
const ball = ref();
const balls = ref<Record<string, any>>({});

const id = Date.now();

const { style, isDragging } = useDraggable(ball);
const { x, y, update } = useElementScreenPosition(ball);
useRafFn(() => isDragging.value && update());

const lines = computed(() => {
  return Object.values(balls.value).map((ball) => {
    return {
      height: Math.sqrt(
        Math.pow(x.value - ball.x, 2) + Math.pow(y.value - ball.y, 2)
      ),
      angle: (Math.atan2(ball.y - y.value, ball.x - x.value) * 180) / Math.PI - 90,
      ...ball,
    };
  });
});

const { post, data } = useBroadcastChannel({ name: "demo-channel" });

const broadcastHandle = {
  set({ id: _id, ...data }: any) {
    if (id === _id) return;
    balls.value[_id] = data;
    post({ id, x: x.value, y: y.value, type: "set" });
  },
  delete({ id }: any) {
    delete balls.value[id];
  },
};

watch(data, () => {
  const { type, ...json } = data.value as any;
  // @ts-expect-error ignore
  broadcastHandle[type]?.(json);
});

watch([x, y], () => {
  post({ id, x: x.value, y: y.value, type: "set" });
});

addEventListener("unload", () => {
  post({ id, type: "delete" });
});
</script>

<template>
  <div class="h-100vh w-100vw">
    <div
      :style="style"
      ref="ball"
      class="absolute w-40 bg-red-50 h-40 select-none rounded-full border border-red border-solid flex items-center justify-center"
    >
      {{ x }},{{ y }}
      <div
        v-for="item in lines"
        class="absolute top-50% left-50% w-1px h-1px bg-black transform-origin-top"
        :style="{
          height: (item ? item.height : 0) + 'px',
          transform: 'rotate(' + (item ? item.angle : 0) + 'deg)',
        }"
      ></div>
    </div>
  </div>
</template>

<style>
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>
