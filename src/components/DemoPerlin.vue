<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Noise } from 'noisejs'

const RESOLUTION = 2
const SPEED = 0.003
// feTurbulence baseFrequency scales with RESOLUTION so apparent grain size matches full-res
const GRAIN_FREQ = (0.6 * RESOLUTION).toFixed(2)

let grainData: Uint8ClampedArray | null = null
let rafId: number | undefined
let resizeListener: (() => void) | undefined

function loadGrainData(w: number, h: number): Promise<void> {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <filter id="f"><feTurbulence type="fractalNoise" baseFrequency="${GRAIN_FREQ}" numOctaves="1"/></filter>
        <rect width="100%" height="100%" filter="url(#f)"/>
    </svg>`
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    return new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            const c = document.createElement('canvas')
            c.width = w
            c.height = h
            c.getContext('2d')!.drawImage(img, 0, 0)
            URL.revokeObjectURL(url)
            grainData = c.getContext('2d')!.getImageData(0, 0, w, h).data
            resolve()
        }
        img.src = url
    })
}

function startLoop(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    const noise = new Noise(Math.random())
    let t = 0
    let last = 0

    const frame = (now: number) => {
        if (now - last < 1000 / 20) { rafId = requestAnimationFrame(frame); return }
        const { width: w, height: h } = canvas
        const imageData = ctx.createImageData(w, h)
        const data = imageData.data

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const v = noise.simplex3(x / 800, y / 800, t)
                const i = (y * w + x) * 4
                const grain = grainData ? (grainData[i] / 255 - 0.5) * 80 : 0
                data[i] = 80; data[i + 1] = 46; data[i + 2] = 120
                data[i + 3] = Math.max(0, Math.min(255, v * 600 + grain))
            }
        }

        ctx.putImageData(imageData, 0, 0)
        t += SPEED
        last = now
        rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
}

onMounted(async () => {
    const canvas = document.getElementById('perlinbg') as HTMLCanvasElement
    canvas.width = Math.ceil(window.innerWidth / RESOLUTION)
    canvas.height = Math.ceil(window.innerHeight / RESOLUTION)

    await loadGrainData(canvas.width, canvas.height)
    startLoop(canvas)

    resizeListener = async () => {
        canvas.width = Math.ceil(window.innerWidth / RESOLUTION)
        canvas.height = Math.ceil(window.innerHeight / RESOLUTION)
        await loadGrainData(canvas.width, canvas.height)
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
</template>

<style scoped>
canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
}
</style>
