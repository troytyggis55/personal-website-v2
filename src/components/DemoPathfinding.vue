<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ButtonToggle from '@/components/ButtonToggle.vue'
import Node from '../demos/pathfinding'
import { Noise } from 'noisejs'

const props = defineProps({
    showControls: { type: Boolean, default: true }
})

const max = 500
const res = ref(50)
const cellSize = computed(() => max / res.value)

const tick = ref(200)
let searchInterval: ReturnType<typeof setTimeout> | undefined
let pathInterval: ReturnType<typeof setTimeout> | undefined
let autoResetTimeout: ReturnType<typeof setTimeout> | undefined

const algorithm = ref('aStar')
const geometry = ref('euclidean')
const strength = ref(1)

const searched = ref(0)
const distance = ref(0)

const menu = ref('layout')

let cells: any[][]

const cellColor = ref(`gray`)
const hasInteracted = ref(false)

// ── Canvas helpers ────────────────────────────────────────────────────────────

onMounted(() => {
    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.imageSmoothingEnabled = false

    canvas.width = max + 1
    canvas.height = max + 1

    resetCanvas()
    randomizeCanvas()

    let mouseDown = false
    let mouseEnter = false

    const handleMouseDownOrTouchStart = (e: MouseEvent | TouchEvent) => {
        hasInteracted.value = true
        clearAutoReset()
        clearCurrentInterval()
        clearSearch(canvas)

        if (e instanceof MouseEvent) {
            setCellByPixel(canvas, e.clientX, e.clientY, cellColor.value)
        } else {
            setCellByPixel(canvas, e.touches[0].clientX, e.touches[0].clientY, cellColor.value)
        }

        mouseDown = true
        mouseEnter = true
    }

    const handleMouseUpOrTouchEnd = () => {
        mouseDown = false
        clearCurrentInterval()
        pathfind(canvas)
    }

    const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault()
        if (mouseDown && mouseEnter) {
            clearCurrentInterval()
            clearSearch(canvas)
            if (e instanceof MouseEvent) {
                setCellByPixel(canvas, e.clientX, e.clientY, cellColor.value)
            } else {
                setCellByPixel(canvas, e.touches[0].clientX, e.touches[0].clientY, cellColor.value)
            }
        }
    }

    canvas.addEventListener('mousedown', handleMouseDownOrTouchStart)
    canvas.addEventListener('touchstart', handleMouseDownOrTouchStart)

    canvas.addEventListener('mouseenter', () => {
        mouseEnter = true
    })
    canvas.addEventListener('mouseleave', () => {
        mouseEnter = false
    })

    canvas.addEventListener('mouseup', handleMouseUpOrTouchEnd)
    canvas.addEventListener('touchend', handleMouseUpOrTouchEnd)

    canvas.addEventListener('mousemove', handleMouseMoveOrTouchMove)
    canvas.addEventListener('touchmove', handleMouseMoveOrTouchMove)

    // Listenere for when showControls toggles, to reset hasInteracted
    watch(
        () => props.showControls,
        newVal => {
            if (!newVal) {
                hasInteracted.value = false
                scheduleAutoReset()
            } else {
                console.log('clearing auto reset')
                hasInteracted.value = true
                clearAutoReset()
            }
        }
    )
})

const clearCurrentInterval = () => {
    clearInterval(searchInterval)
    clearInterval(pathInterval)
    searchInterval = undefined
    pathInterval = undefined
}

const clearAutoReset = () => {
    clearTimeout(autoResetTimeout)
    autoResetTimeout = undefined
}

const scheduleAutoReset = () => {
    clearAutoReset()
    autoResetTimeout = setTimeout(() => {
        if (!hasInteracted.value) {
            const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
            if (canvas) {
                resetCanvas()
                randomizeCanvas()
            }
        }
    }, 1000)
}

watch([res], () => {
    clearCurrentInterval()
    clearAutoReset()
    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
    canvas.width = max + 1
    canvas.height = max + 1
    resetCanvas()
})

watch([tick, algorithm, geometry, strength], () => {
    clearCurrentInterval()
    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
    clearSearch(canvas)
    pathfind(canvas)
})

const resetCanvas = () => {
    clearCurrentInterval()
    clearAutoReset()

    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement

    cells = Array.from({ length: res.value }, () => Array.from({ length: res.value }, () => null))

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = 'rgb(70,70,70)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = 0; x < res.value; x++) {
        for (let y = 0; y < res.value; y++) {
            cells[x][y] = new Node('black', x, y, y === res.value - 1, x === res.value - 1)
            cells[x][y].draw(ctx, cellSize)
        }
    }
}

// Find the cell in a region with the minimum local noise sum (most open area).
// Region is defined as [x0, x1) x [y0, y1) in grid coords.
function findOpenCell(
    noiseMap: number[][],
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    radius: number = 2
): [number, number] {
    let bestX = x0
    let bestY = y0
    let bestScore = Infinity

    for (let x = x0; x < x1; x++) {
        for (let y = y0; y < y1; y++) {
            let score = 0
            let count = 0
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    const nx = x + dx
                    const ny = y + dy
                    if (nx >= 0 && nx < noiseMap.length && ny >= 0 && ny < noiseMap[0].length) {
                        score += noiseMap[nx][ny]
                        count++
                    }
                }
            }
            if (count > 0 && score / count < bestScore) {
                bestScore = score / count
                bestX = x
                bestY = y
            }
        }
    }
    return [bestX, bestY]
}

const randomizeCanvas = () => {
    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    clearCurrentInterval()
    clearSearch(canvas)

    const perlin = new Noise(Math.random())

    const scale = 0.18
    const wallThreshold = 0.15 // noise > threshold → wall (~30% coverage)

    // Build noise map
    const noiseMap: number[][] = Array.from({ length: res.value }, () =>
        new Array(res.value).fill(0)
    )
    for (let x = 0; x < res.value; x++) {
        for (let y = 0; y < res.value; y++) {
            const n = perlin.perlin2(x * scale, y * scale)
            noiseMap[x][y] = n
            cells[x][y].state = n > wallThreshold ? 'gray' : 'black'
            cells[x][y].draw(ctx, cellSize)
        }
    }

    // Place start and end in different random quadrants
    const half = Math.floor(res.value / 2)
    const margin = Math.floor(res.value * 0.1)

    const quadrants: Array<[number, number, number, number]> = [
        [margin, half, margin, half],
        [half, res.value - margin, margin, half],
        [margin, half, half, res.value - margin],
        [half, res.value - margin, half, res.value - margin]
    ]

    const startQuadrantIndex = Math.floor(Math.random() * quadrants.length)
    let endQuadrantIndex = Math.floor(Math.random() * (quadrants.length - 1))
    if (endQuadrantIndex >= startQuadrantIndex) endQuadrantIndex++

    const [sx0, sx1, sy0, sy1] = quadrants[startQuadrantIndex]
    const [sx, sy] = findOpenCell(noiseMap, sx0, sx1, sy0, sy1)
    cells[sx][sy].state = 'blue'
    cells[sx][sy].draw(ctx, cellSize)

    const [ex0, ex1, ey0, ey1] = quadrants[endQuadrantIndex]
    const [ex, ey] = findOpenCell(noiseMap, ex0, ex1, ey0, ey1)
    cells[ex][ey].state = 'red'
    cells[ex][ey].draw(ctx, cellSize)

    pathfind(canvas)
}

const pathfind = (canvas: HTMLCanvasElement) => {
    const start: Node = cells
        .find(row => row.find(cell => cell.state === 'blue'))
        ?.find(cell => cell.state === 'blue')
    const end: Node = cells
        .find(row => row.find(cell => cell.state === 'red'))
        ?.find(cell => cell.state === 'red')

    if (!start || !end) {
        return
    }

    start.distanceFromStart = 0
    const queue: Node[] = []
    queue.push(start)

    searchInterval = setInterval(() => {
        if (queue.length === 0) {
            clearCurrentInterval()
            return
        }

        const current = queue.shift() as Node
        searched.value = searched.value + 1
        distance.value = parseFloat(current.distanceFromStart.toFixed(2))

        if (current.equals(end)) {
            showPath(canvas, current)
            clearInterval(searchInterval)
            searchInterval = undefined
            return
        }
        current.state = current === start ? 'blue' : 'yellow'
        current.draw(canvas.getContext('2d') as CanvasRenderingContext2D, cellSize)

        for (const neighbor of geometry.value === 'manhatten'
            ? current.getOrthogonalNeighbors(cells)
            : current.getAllNeighbors(cells)) {
            if (
                neighbor.state !== 'black' &&
                neighbor.state !== 'red' &&
                neighbor.state !== 'purple'
            )
                continue
            neighbor.state = neighbor.state === 'red' ? 'red' : 'purple'
            neighbor.draw(canvas.getContext('2d') as CanvasRenderingContext2D, cellSize)

            let distance =
                current.distanceFromStart +
                (geometry.value === 'manhatten'
                    ? neighbor.getManhattenDistanceTo(current)
                    : neighbor.getEuclideanDistanceTo(current))

            if (distance < neighbor.distanceFromStart) {
                neighbor.distanceFromStart = distance
                neighbor.weightedDistanceFromStart =
                    distance +
                    (algorithm.value === 'aStar' || algorithm.value === 'greedy'
                        ? (geometry.value === 'manhatten'
                              ? neighbor.getManhattenDistanceTo(end)
                              : neighbor.getEuclideanDistanceTo(end)) *
                          (algorithm.value === 'greedy' ? strength.value : 1)
                        : 0)
                neighbor.previous = current

                if (!queue.includes(neighbor)) queue.push(neighbor)
            }
        }
        queue.sort((a, b) => a.weightedDistanceFromStart - b.weightedDistanceFromStart)
    }, 1000 / tick.value)
}

const showPath = (canvas: HTMLCanvasElement, current: Node) => {
    let previous = current.previous

    pathInterval = setInterval(() => {
        if (!previous) {
            clearCurrentInterval()
            scheduleAutoReset()
            return
        }
        previous.state = previous.state === 'blue' ? 'blue' : 'green'
        previous.draw(canvas.getContext('2d') as CanvasRenderingContext2D, cellSize)
        previous = previous.previous
    }, 50)
}

const clearSearch = (canvas: HTMLCanvasElement) => {
    searched.value = 0
    distance.value = 0

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = 'rgb(70,70,70)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < res.value; i++) {
        for (let j = 0; j < res.value; j++) {
            if (
                cells[i][j].state === 'yellow' ||
                cells[i][j].state === 'purple' ||
                cells[i][j].state === 'green'
            ) {
                cells[i][j].state = 'black'
            }
            cells[i][j].distanceFromStart = Infinity
            cells[i][j].previous = null
            cells[i][j].draw(ctx, cellSize)
        }
    }
}

const setCellByPixel = (canvas: HTMLCanvasElement, x: number, y: number, color: string) => {
    const rect = canvas.getBoundingClientRect()
    if (x < rect.left || x + 1 >= rect.right || y < rect.top || y + 1 >= rect.bottom) return

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const canvasX = (x - rect.left) * scaleX
    const canvasY = (y - rect.top) * scaleY

    const cellX = Math.floor(canvasX / cellSize.value)
    const cellY = Math.floor(canvasY / cellSize.value)

    const replaceColor = (color: string) => {
        for (let i = 0; i < res.value; i++) {
            for (let j = 0; j < res.value; j++) {
                if (cells[i][j].state === color) {
                    cells[i][j].state = 'black'
                    cells[i][j].draw(canvas.getContext('2d') as CanvasRenderingContext2D, cellSize)
                }
            }
        }
    }

    if (color === 'blue' || color === 'red') replaceColor(color)

    cells[cellX][cellY].state = color
    cells[cellX][cellY].draw(canvas.getContext('2d') as CanvasRenderingContext2D, cellSize)
}

onUnmounted(() => {
    clearCurrentInterval()
    clearAutoReset()
})
</script>

<template>
    <div class="flex flex-col gap-3 justify-center items-center">
        <canvas id="pathfinding" class="w-full max-w-md h-auto" />
        <template v-if="showControls">
            <div class="flex flex-row gap-2 justify-center">
                <ButtonToggle text="Layout" value="layout" v-model="menu" />
                <ButtonToggle text="Algoritme" value="algo" v-model="menu" />
                <ButtonToggle text="Konfigurasjon" value="settings" v-model="menu" />
            </div>
            <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'layout'">
                <ButtonToggle value="gray" text="Vegg" v-model="cellColor" />
                <ButtonToggle value="blue" text="Start" v-model="cellColor" />
                <ButtonToggle value="red" text="Slutt" v-model="cellColor" />
                <ButtonToggle value="black" text="Tom" v-model="cellColor" />
                <button @click="randomizeCanvas" class="p-2 border border-white/30">🎲</button>
                <button @click="resetCanvas" class="p-2 border border-white/30">🗑️</button>
            </div>
            <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'settings'">
                <div class="flex flex-col">
                    <span>Oppløsning</span>
                    <input type="range" min="5" max="50" v-model="res" />
                </div>
                <div class="flex flex-col">
                    <span>Hastighet</span>
                    <input type="range" min="1" max="200" v-model="tick" />
                </div>
            </div>
            <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'algo'">
                <select v-model="geometry">
                    <option value="manhatten" selected>Manhattan</option>
                    <option value="euclidean">Euklidisk</option>
                </select>
                <select v-model="algorithm">
                    <option value="dijkstra" selected>Dijkstra</option>
                    <option value="aStar">A*</option>
                    <option value="greedy">Grådig A*</option>
                </select>
                <div class="flex flex-row gap-2" v-if="algorithm === 'greedy'">
                    <div class="flex flex-col">
                        <span>Styrke</span>
                        <input type="range" min="1" max="10" v-model="strength" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-4 justify-center text-sm opacity-60">
                <span>Distanse: {{ distance }}</span>
                <span>Søkt: {{ searched }}</span>
            </div>
        </template>
    </div>
</template>

<style scoped></style>
