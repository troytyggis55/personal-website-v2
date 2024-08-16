<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Node from '../demos/fluid'; // Assuming the 'Node' class was meant to be 'Fluid' from your previous code.

let interval: NodeJS.Timeout | null = null;

const max = 500;

const idealSearchRadius = ref<number>(49);
const searchRadius = computed(() => max / Math.round(max / idealSearchRadius.value));

const repelForce = ref<number>(0.01);
const gravity = ref<number>(0.5);
const friction = ref<number>(0);
const maxSpeed = ref<number>(5);

const nodeAmount = ref<number>(100);

onMounted(() => {
    const canvas = document.getElementById('fluidsimulation') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = true;

    canvas.width = max;
    canvas.height = max;

    let nodes: Node[] = [];
    let grid: Node[][][] = [];

    for (let i = 0; i < 100; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    interval = setInterval(() => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (mouseDown && mouseEnter) {
            createNode(canvas, mouseX, mouseY, nodes)
        }

        ctx.fillStyle = 'white';
        updateGrid(canvas, grid, nodes);
        drawGrid(ctx, canvas, grid);

        for (let node of nodes) {
            node.wallForce(canvas, searchRadius.value);
            node.detectNeighbors(canvas, grid, searchRadius.value);
            node.repelNeighbors(searchRadius.value, repelForce.value);
        }

        for (let node of nodes) {
            node.move(canvas, gravity.value, friction.value, maxSpeed.value,
                searchRadius.value);
            node.draw(ctx);
        }
    }, 1000 / 60);

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

const createNode = (canvas: HTMLCanvasElement, x: number, y: number, nodes: Node[]) => {
    if (nodes.length > 1000) return

    const rect = canvas.getBoundingClientRect()
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const canvasX = (x - rect.left) * scaleX
    const canvasY = (y - rect.top) * scaleY

    const newNode = new Node(canvasX, canvasY);
    nodes.push(newNode);
    nodeAmount.value = nodes.length;
}

const updateGrid = (canvas: HTMLCanvasElement, grid: Node[][][], nodes: Node[]) => {
    for (let i = 0; i <= canvas.width / searchRadius.value; i++) {
        grid[i] = [];
        for (let j = 0; j <= canvas.height / searchRadius.value; j++) {
            grid[i][j] = [];
        }
    }

    for (let node of nodes) {
        grid[Math.floor(node.pos.x / searchRadius.value)][Math.floor(node.pos.y /
            searchRadius.value)].push(node);
    }
}

const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, grid: Node[][][]) => {
    for (let i = 0; i < canvas.width / searchRadius.value; i++) {
        for (let j = 0; j < canvas.height / searchRadius.value; j++) {
            let population = grid[i][j].length;
            ctx.fillStyle = 'rgba(255, 255, 255, ' + (population / 10) + ')';
            ctx.fillRect(i * searchRadius.value, j * searchRadius.value, searchRadius.value, searchRadius.value);
        }
    }
}

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <h2>Fluid Simulation</h2>
    <div class="flex flex-row flex-wrap gap-4">
        <div class="flex flex-col">
            <span>Search Radius {{ searchRadius.toFixed(2) }}</span>
            <input type="range" min="10" max="100" v-model.number="idealSearchRadius" class="w-full">
        </div>
        <div class="flex flex-col">
            <span>Repel Force {{ repelForce }}</span>
            <input type="range" min="0" max="0.1" step="0.001" v-model.number="repelForce"
                   class="w-full">
        </div>
        <div class="flex flex-col">
            <span>Gravity {{ gravity }}</span>
            <input type="range" min="0" max="1" step="0.1" v-model.number="gravity" class="w-full">
        </div>
        <div class="flex flex-col">
            <span>Friction {{ friction }}</span>
            <input type="range" min="0" max="1" step="0.1" v-model.number="friction" class="w-full">
        </div>
        <div class="flex flex-col">
            <span>Max Speed {{ maxSpeed }}</span>
            <input type="range" min="1" max="20" v-model.number="maxSpeed" class="w-full">
        </div>
        <span>Particles: {{ nodeAmount }}</span>
    </div>
    <canvas id="fluidsimulation" class="max-w-md"></canvas>
</template>
