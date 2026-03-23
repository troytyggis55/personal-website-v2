<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Noise } from 'noisejs'

const RESOLUTION = 8  // render 1/8th of screen pixels, blur hides the pixelation
const SPEED = 0.0005
const scale = 0.8

const vw = ref(window.innerWidth * scale)
const vh = ref(window.innerHeight * scale)

let rafId: number | undefined
let resizeListener: (() => void) | undefined

function startLoop(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    const noise = new Noise(Math.random())
    let t = 0

    const frame = () => {
        const { width: w, height: h } = canvas
        const imageData = ctx.createImageData(w, h)
        const data = imageData.data

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const v = noise.simplex3(x / 200, y / 200, t)
                const i = (y * w + x) * 4
                data[i] = 80; data[i + 1] = 46; data[i + 2] = 130
                data[i + 3] = v * 255
            }
        }

        ctx.putImageData(imageData, 0, 0)
        t += SPEED
        rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
}

onMounted(() => {
    const canvas = document.getElementById('perlinbg') as HTMLCanvasElement
    canvas.width = Math.ceil(window.innerWidth / RESOLUTION)
    canvas.height = Math.ceil(window.innerHeight / RESOLUTION)
    startLoop(canvas)

    resizeListener = () => {
        vw.value = window.innerWidth
        vh.value = window.innerHeight
        canvas.width = Math.ceil(window.innerWidth / RESOLUTION)
        canvas.height = Math.ceil(window.innerHeight / RESOLUTION)
    }
    window.addEventListener('resize', resizeListener)
})

onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    if (resizeListener) window.removeEventListener('resize', resizeListener)
})
</script>

<template>
    <canvas id="perlinbg"></canvas>
    <svg class="grain" :width="vw" :height="vh" xmlns="http://www.w3.org/2000/svg">
        <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch' />
        </filter>
        <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>
</template>

<style scoped>
canvas, .grain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
}

canvas {
    z-index: -1;
}

.grain {
    z-index: -1;
    opacity: 0.04;
    mix-blend-mode: screen;
}
</style>
