import type { ComputedRef } from 'vue'

class Pathfinding {
    state: string
    x: number
    y: number
    isTop: boolean
    isBottom: boolean
    isLeft: boolean
    isRight: boolean

    distanceFromStart = Infinity
    weightedDistanceFromStart = Infinity

    previous: Pathfinding | null = null

    constructor(state: string, x: number, y: number, isBottom: boolean, isRight: boolean) {
        this.state = state
        this.x = x
        this.y = y
        this.isTop = y === 0
        this.isBottom = isBottom
        this.isLeft = x === 0
        this.isRight = isRight
    }

    getManhattenDistanceTo(node: Pathfinding) {
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y)
    }

    getEuclideanDistanceTo(node: Pathfinding) {
        return Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2))
    }

    getAllNeighbors(grid: Pathfinding[][]) {
        const neighbors = []

        if (!this.isLeft && !this.isTop) neighbors.push(grid[this.x - 1][this.y - 1])
        if (!this.isTop) neighbors.push(grid[this.x][this.y - 1])
        if (!this.isTop && !this.isRight) neighbors.push(grid[this.x + 1][this.y - 1])
        if (!this.isRight) neighbors.push(grid[this.x + 1][this.y])
        if (!this.isRight && !this.isBottom) neighbors.push(grid[this.x + 1][this.y + 1])
        if (!this.isBottom) neighbors.push(grid[this.x][this.y + 1])
        if (!this.isBottom && !this.isLeft) neighbors.push(grid[this.x - 1][this.y + 1])
        if (!this.isLeft) neighbors.push(grid[this.x - 1][this.y])

        return neighbors
    }

    getOrthogonalNeighbors(grid: Pathfinding[][]) {
        const neighbors = []

        if (!this.isTop) neighbors.push(grid[this.x][this.y - 1])
        if (!this.isRight) neighbors.push(grid[this.x + 1][this.y])
        if (!this.isBottom) neighbors.push(grid[this.x][this.y + 1])
        if (!this.isLeft) neighbors.push(grid[this.x - 1][this.y])

        return neighbors
    }

    draw(ctx: CanvasRenderingContext2D, computedSize: ComputedRef<number>) {
        ctx.fillStyle = this.state
        const size = computedSize.value
        ctx.fillRect(this.x * size + 1, this.y * size + 1, size - 1, size - 1)
    }

    equals(node: Pathfinding) {
        return this.x === node.x && this.y === node.y
    }
}

export default Pathfinding
