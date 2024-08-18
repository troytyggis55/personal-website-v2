<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Node from '../demos/fluid'
import Victor from 'victor'
import ButtonToggle from '@/components/ButtonToggle.vue'

let interval: ReturnType<typeof setTimeout> | undefined

const max = 500

const idealSearchRadius = ref<number>(25)
const searchRadius = computed(() => max / Math.round(max / idealSearchRadius.value))

const repelForce = ref<number>(0.04)
const gravity = ref<number>(0.2)
const friction = ref<number>(0.005)
const maxSpeed = ref<number>(10)

const nodeAmount = ref<number>(100)
const clickType = ref<string>('create')
const displayGrid = ref<boolean>(true)

let nodes: Node[] = []
let grid: Node[][][] = []

onMounted(() => {
    const canvas = document.getElementById('fluidsimulation') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.imageSmoothingEnabled = true

    canvas.width = max
    canvas.height = max

    for (let i = 0; i < 100; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    interval = setInterval(() => {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (mouseDown && mouseEnter) {
            if (clickType.value == 'create') createNode(canvas, mouseX, mouseY)
            else deleteNodes(canvas, mouseX, mouseY)
        }
        nodeAmount.value = nodes.length

        ctx.fillStyle = 'white'
        updateGrid(canvas, grid)
        if (displayGrid.value) drawGrid(ctx, canvas, grid)

        for (let node of nodes) {
            node.wallForce(canvas, searchRadius.value)
            node.detectNeighbors(canvas, grid, searchRadius.value)
            node.repelNeighbors(searchRadius.value, repelForce.value)
        }

        for (let node of nodes) {
            node.move(canvas, gravity.value, friction.value, maxSpeed.value, searchRadius.value)
            node.draw(ctx)
        }
    }, 1000 / 60)

    let mouseDown = false
    let mouseEnter = false
    let mouseX = 0
    let mouseY = 0

    const handleMouseDownOrTouchStart = (e: MouseEvent | TouchEvent) => {
        mouseDown = true
        mouseEnter = true

        if (e instanceof MouseEvent) {
            mouseX = e.clientX
            mouseY = e.clientY
        } else if (e instanceof TouchEvent) {
            mouseX = e.touches[0].clientX
            mouseY = e.touches[0].clientY
        }
    }

    const handleMouseUpOrTouchEnd = () => {
        mouseDown = false
    }

    const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault()
        if (mouseDown) {
            if (e instanceof MouseEvent) {
                mouseX = e.clientX
                mouseY = e.clientY
            } else if (e instanceof TouchEvent) {
                mouseX = e.touches[0].clientX
                mouseY = e.touches[0].clientY
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

    window.addEventListener('mouseup', handleMouseUpOrTouchEnd)
    canvas.addEventListener('touchend', handleMouseUpOrTouchEnd)
    canvas.addEventListener('touchcancel', handleMouseUpOrTouchEnd)

    canvas.addEventListener('mousemove', handleMouseMoveOrTouchMove)
    canvas.addEventListener('touchmove', handleMouseMoveOrTouchMove)
})

const createNode = (canvas: HTMLCanvasElement, x: number, y: number) => {
    if (nodes.length > 1000) return

    const rect = canvas.getBoundingClientRect()
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const canvasX = (x - rect.left) * scaleX
    const canvasY = (y - rect.top) * scaleY

    const newNode = new Node(canvasX, canvasY)
    nodes.push(newNode)
}

const deleteNodes = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const canvasX = (x - rect.left) * scaleX
    const canvasY = (y - rect.top) * scaleY

    nodes = nodes.filter(node => node.pos.distance(new Victor(canvasX, canvasY)) > 50)
}

const clearNodes = () => {
    nodes.splice(0, nodes.length)
}

const updateGrid = (canvas: HTMLCanvasElement, grid: Node[][][]) => {
    for (let i = 0; i <= canvas.width / searchRadius.value; i++) {
        grid[i] = []
        for (let j = 0; j <= canvas.height / searchRadius.value; j++) {
            grid[i][j] = []
        }
    }

    for (let node of nodes) {
        grid[Math.floor(node.pos.x / searchRadius.value)][
            Math.floor(node.pos.y / searchRadius.value)
        ].push(node)
    }
}

const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, grid: Node[][][]) => {
    for (let i = 0; i < canvas.width / searchRadius.value; i++) {
        for (let j = 0; j < canvas.height / searchRadius.value; j++) {
            let population = grid[i][j].length
            ctx.fillStyle = 'rgba(255, 255, 255, ' + population / 10 + ')'
            ctx.fillRect(
                i * searchRadius.value,
                j * searchRadius.value,
                searchRadius.value,
                searchRadius.value
            )
        }
    }
}

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<template>
    <div class="flex flex-row flex-wrap gap-5 justify-center w-full">
        <div class="flex flex-col gap-4 min-w-60">
            <div class="flex flex-row flex-wrap gap-2 justify-center">
                <ButtonToggle value="create" text="Create" v-model="clickType" />
                <ButtonToggle value="delete" text="Delete" v-model="clickType" />
                <button @click="clearNodes" class="border border-white p-2">Clear</button>
            </div>
            <div class="flex flex-col">
                <span>Search Radius {{ searchRadius.toFixed(2) }}</span>
                <input
                    type="range"
                    min="10"
                    max="100"
                    v-model.number="idealSearchRadius"
                    class="w-full"
                />
            </div>
            <div class="flex flex-col">
                <span>Repel Force {{ repelForce }}</span>
                <input
                    type="range"
                    min="0"
                    max="0.1"
                    step="0.001"
                    v-model.number="repelForce"
                    class="w-full"
                />
            </div>
            <div class="flex flex-col">
                <span>Gravity {{ gravity }}</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    v-model.number="gravity"
                    class="w-full"
                />
            </div>
            <div class="flex flex-col">
                <span>Friction {{ friction }}</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    v-model.number="friction"
                    class="w-full"
                />
            </div>
            <div class="flex flex-col">
                <span>Max Speed {{ maxSpeed }}</span>
                <input type="range" min="1" max="20" v-model.number="maxSpeed" class="w-full" />
            </div>
            <div class="flex flex-row gap-2 justify-between items-center">
                <span class="">Particles: {{ nodeAmount }}</span>
                <button class="border border-white p-2" @click="displayGrid = !displayGrid">
                    Toggle grid
                </button>
            </div>
        </div>
        <canvas id="fluidsimulation" class="w-full max-w-md h-auto" />
    </div>
</template>
