<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Node from '../demos/network'

let interval: ReturnType<typeof setTimeout> | undefined
let resizeListener: (() => void) | undefined

onMounted(() => {
    const canvas = document.getElementById('networkgraphic') as HTMLCanvasElement

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let pixelAmount = canvas.width * canvas.height
    const searchRadiusFraction = 2

    const nodeFraction = 50000
    const minNodeAmount = 5

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = 'white'

    let nodes: Node[] = []

    let minDimension = Math.min(canvas.width, canvas.height)

    for (let i = 0; i < pixelAmount / nodeFraction + minNodeAmount; i++) {
        nodes.push(
            new Node(
                randNum(canvas.width),
                randNum(canvas.height),
                randRange(-1, 1),
                randRange(-1, 1),
                minDimension / searchRadiusFraction
            )
        )
    }

    resizeListener = () => {
        let xdiff = window.innerWidth / canvas.width
        let ydiff = window.innerHeight / canvas.height

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        pixelAmount = canvas.width * canvas.height
        minDimension = Math.min(canvas.width, canvas.height)

        for (let node of nodes) {
            node.pos.x *= xdiff
            node.pos.y *= ydiff
            node.searchRadius = Math.min(
                randRange(
                    (minDimension / searchRadiusFraction) * 0.8,
                    (minDimension / searchRadiusFraction) * 1.2
                ),
                200
            )
        }

        if (nodes.length > pixelAmount / nodeFraction + minNodeAmount) {
            nodes.splice(pixelAmount / nodeFraction, nodes.length - pixelAmount / nodeFraction)
        } else {
            for (let i = 0; i < pixelAmount / nodeFraction - nodes.length + minNodeAmount; i++) {
                nodes.push(
                    new Node(
                        randNum(canvas.width),
                        randNum(canvas.height),
                        randRange(-1, 1),
                        randRange(-1, 1),
                        minDimension / searchRadiusFraction
                    )
                )
            }
        }
    }

    window.addEventListener('resize', resizeListener)

    interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let node of nodes) {
            node.move(canvas)
        }

        for (let node of nodes) {
            node.detect(nodes, canvas)
            node.drawNode(ctx)
            node.drawLines(ctx, canvas)
        }
    }, 1000 / 24)
})

const randNum = (num: number): number => {
    return Math.random() * num
}

const randRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
    if (resizeListener) {
        window.removeEventListener('resize', resizeListener)
    }
})
</script>

<template>
    <canvas id="networkgraphic"></canvas>
</template>

<style scoped>
canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
