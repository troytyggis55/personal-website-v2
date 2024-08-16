<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Node from '../demos/fluid'; // Assuming the 'Node' class was meant to be 'Fluid' from your previous code.

let interval: NodeJS.Timeout | null = null;

const max = 500;

const idealSearchRadius = ref(49);
const searchRadius = computed(() => max / Math.round(max / idealSearchRadius.value));

const repelForce = ref(0.01);
const gravity = ref(0.1);
const friction = ref(0.995);
const maxSpeed = ref(5);

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
            node.move(canvas, gravity.value, friction.value, maxSpeed.value, searchRadius.value);
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
    <canvas id="fluidsimulation" class="max-w-md"></canvas>
</template>
