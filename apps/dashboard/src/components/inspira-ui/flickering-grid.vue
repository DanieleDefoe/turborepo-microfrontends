<script lang="ts" setup>
  import { cn } from "@/lib/utils";

  interface FlickeringGridProps {
    class?: string;
    color?: string;
    flickerChance?: number;
    gridGap?: number;
    height?: number;
    maxOpacity?: number;
    squareSize?: number;
    width?: number;
  }

  const props = withDefaults(defineProps<FlickeringGridProps>(), {
    color: "rgb(0, 0, 0)",
    flickerChance: 0.3,
    gridGap: 6,
    maxOpacity: 0.3,
    squareSize: 4,
  });

  const {
    squareSize,
    gridGap,
    flickerChance,
    color,
    maxOpacity,
    width,
    height,
  } = toRefs(props);

  const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
  const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
  const context = ref<CanvasRenderingContext2D>();

  const isInView = shallowRef(false);
  const canvasSize = ref({ height: 0, width: 0 });

  const hexColorRegex = /^#/;
  const computedColor = computed(() => {
    if (!context.value) {
      return "rgba(255, 0, 0,";
    }

    const hex = color.value.replace(hexColorRegex, "");
    const bigint = Number.parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b},`;
  });

  function setupCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): {
    cols: number;
    rows: number;
    squares: Float32Array;
    dpr: number;
  } {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.floor(width / (squareSize.value + gridGap.value));
    const rows = Math.floor(height / (squareSize.value + gridGap.value));

    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity.value;
    }
    return { cols, dpr, rows, squares };
  }

  function updateSquares(squares: Float32Array, deltaTime: number) {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance.value * deltaTime) {
        squares[i] = Math.random() * maxOpacity.value;
      }
    }
  }

  function drawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cols: number,
    rows: number,
    squares: Float32Array,
    dpr: number
  ) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const opacity = squares[i * rows + j];
        ctx.fillStyle = `${computedColor.value}${opacity})`;
        ctx.fillRect(
          i * (squareSize.value + gridGap.value) * dpr,
          j * (squareSize.value + gridGap.value) * dpr,
          squareSize.value * dpr,
          squareSize.value * dpr
        );
      }
    }
  }

  const gridParams = ref<ReturnType<typeof setupCanvas>>();

  function updateCanvasSize() {
    const newWidth = width.value || containerRef.value!.clientWidth;
    const newHeight = height.value || containerRef.value!.clientHeight;

    canvasSize.value = { height: newHeight, width: newWidth };
    gridParams.value = setupCanvas(canvasRef.value!, newWidth, newHeight);
  }

  let animationFrameId: number | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  let lastTime = 0;

  function animate(time: number) {
    if (!isInView.value) {
      return;
    }

    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    updateSquares(gridParams.value!.squares, deltaTime);
    drawGrid(
      context.value!,
      canvasRef.value!.width,
      canvasRef.value!.height,
      gridParams.value!.cols,
      gridParams.value!.rows,
      gridParams.value!.squares,
      gridParams.value!.dpr
    );
    animationFrameId = requestAnimationFrame(animate);
  }

  onMounted(() => {
    if (!(canvasRef.value && containerRef.value)) {
      return;
    }
    context.value = canvasRef.value.getContext("2d")!;
    if (!context.value) {
      return;
    }

    updateCanvasSize();

    resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView.value = entry.isIntersecting;
        animationFrameId = requestAnimationFrame(animate);
      },
      { threshold: 0 }
    );

    resizeObserver.observe(containerRef.value);
    intersectionObserver.observe(canvasRef.value);
  });

  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
  });
</script>

<template>
  <div ref="containerRef" :class="cn('w-full h-full', props.class)">
    <canvas
      class="pointer-events-none"
      ref="canvasRef"
      :height="canvasSize.height"
      :width="canvasSize.width"
    />
  </div>
</template>
