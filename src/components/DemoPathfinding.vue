<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ButtonToggle from '@/components/ButtonToggle.vue'
import Node from '../demos/pathfinding'

const max = 500
const res = ref(50)
const cellSize = computed(() => max / res.value)

const tick = ref(50)
let searchInterval: NodeJS.Timeout | undefined
let pathInterval: NodeJS.Timeout | undefined

const algorithm = ref('aStar')
const geometry = ref('manhatten')
const strength = ref(1)

const searched = ref(0)
const distance = ref(0)

const menu = ref('layout')

let cells: any[][]

// black == empty, white == wall, blue == start, red == end, visited == yellow
const cellColor = ref(`gray`)

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
})

const clearCurrentInterval = () => {
    clearInterval(searchInterval)
    clearInterval(pathInterval)

    searchInterval = undefined
    pathInterval = undefined
}

watch([res], () => {
    clearCurrentInterval()
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

    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement

    cells = Array.from({ length: res.value }, () => Array.from({ length: res.value }, () => null))

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = 0; x < res.value; x++) {
        for (let y = 0; y < res.value; y++) {
            cells[x][y] = new Node('black', x, y, y === res.value - 1, x === res.value - 1)
            cells[x][y].draw(ctx, cellSize)
        }
    }
}

const randomizeCanvas = () => {
    const canvas = document.getElementById('pathfinding') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    clearCurrentInterval()
    clearSearch(canvas)

    for (let i = 0; i < res.value; i++) {
        for (let j = 0; j < res.value; j++) {
            cells[i][j].state = Math.random() < 0.3 ? 'gray' : 'black'
            cells[i][j].draw(ctx, cellSize)
        }
    }

    let randomIndex1 = Math.floor(Math.random() * res.value);
    let randomIndex2 = Math.floor(Math.random() * res.value);
    cells[randomIndex1][randomIndex2].state = 'blue';
    cells[randomIndex1][randomIndex2].draw(ctx, cellSize)

    randomIndex1 = Math.floor(Math.random() * res.value);
    randomIndex2 = Math.floor(Math.random() * res.value);
    cells[randomIndex1][randomIndex2].state = 'red';
    cells[randomIndex1][randomIndex2].draw(ctx, cellSize)

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
            clearInterval(searchInterval) // Only clear this interval, pathInterval will be cleared when path is shown
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
        queue.sort(
            (a, b) =>
                a.weightedDistanceFromStart - b.weightedDistanceFromStart || a.y - b.y || a.x - b.x
        )
    }, 1000 / tick.value)
}

const showPath = (canvas: HTMLCanvasElement, current: Node) => {
    let previous = current.previous

    pathInterval = setInterval(() => {
        if (!previous) {
            clearCurrentInterval()
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
    ctx.fillStyle = 'white'
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
})
</script>

<template>
    <h2>Pathfinding</h2>
    <div class="flex flex-col gap-3 items-center">
        <div class="flex flex-row gap-2 justify-center">
            <ButtonToggle text="Layout" value="layout" v-model="menu" />
            <ButtonToggle text="Algorithm" value="algo" v-model="menu" />
            <ButtonToggle text="Settings" value="settings" v-model="menu" />
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'layout'">
            <ButtonToggle value="gray" text="Wall" v-model="cellColor" />
            <ButtonToggle value="blue" text="Start" v-model="cellColor" />
            <ButtonToggle value="red" text="End" v-model="cellColor" />
            <ButtonToggle value="black" text="Empty" v-model="cellColor" />
            <button @click="randomizeCanvas" class="p-2 border border-white">🎲</button>
            <button @click="resetCanvas" class="p-2 border border-white">🗑️</button>
        </div>

        <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'settings'">
            <div class="flex flex-col">
                <span>Resolution</span>
                <input type="range" min="5" max="50" v-model="res" />
            </div>
            <div class="flex flex-col">
                <span>Speed</span>
                <input type="range" min="1" max="200" v-model="tick" />
            </div>
        </div>

        <div class="flex flex-row flex-wrap gap-2 justify-center" v-if="menu === 'algo'">
            <select v-model="geometry">
                <option value="manhatten" selected>Manhatten</option>
                <option value="euclidean">Euclidean</option>
            </select>
            <select v-model="algorithm">
                <option value="dijkstra" selected>Dijkstra</option>
                <option value="aStar">A*</option>
                <option value="greedy">Greedy A*</option>
            </select>
            <div class="flex flex-row gap-2" v-if="algorithm === 'greedy'">
                <div class="flex flex-col">
                    <span>Strength</span>
                    <input type="range" min="1" max="10" v-model="strength" />
                </div>
            </div>
        </div>
        <div class="flex flex-row gap-2 justify-center">
            <div class="flex flex-col">
                <span>Distance: {{ distance }}</span>
            </div>
            <div class="flex flex-col">
                <span>Searched: {{ searched }}</span>
            </div>
        </div>
        <canvas id="pathfinding" class="w-full max-w-md h-auto" />
    </div>
</template>

<style scoped></style>
