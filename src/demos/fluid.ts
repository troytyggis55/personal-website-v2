import Victor from 'victor'

class Fluid {
    pos: InstanceType<typeof Victor>;
    vel: InstanceType<typeof Victor>;
    neighbors: Fluid[]

    constructor(x: number, y: number) {
        this.pos = new Victor(x, y)
        this.vel = new Victor(0, 0)
        this.neighbors = []
    }

    detectNeighbors(canvas: HTMLCanvasElement, grid: Fluid[][][], searchRadius: number): void {
        const gridPos = new Victor(
            Math.floor(this.pos.x / searchRadius),
            Math.floor(this.pos.y / searchRadius)
        )

        this.neighbors = []
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const x = gridPos.x + i
                const y = gridPos.y + j
                if (
                    x >= 0 &&
                    x < canvas.width / searchRadius &&
                    y >= 0 &&
                    y < canvas.height / searchRadius
                ) {
                    for (const node of grid[x][y]) {
                        if (node !== this && node.pos.distance(this.pos) < searchRadius) {
                            this.neighbors.push(node)
                        }
                    }
                }
            }
        }
    }

    repelNeighbors(searchRadius: number, repelForce: number): void {
        for (const neighbor of this.neighbors) {
            const force = this.pos.clone().subtract(neighbor.pos)
            const magnitude = (searchRadius - force.magnitude()) ** 2
            force.normalize()
            force.multiplyScalar(magnitude * repelForce)
            this.vel.add(force)
        }
    }

    wallForce(canvas: HTMLCanvasElement, searchRadius: number): void {
        if (this.pos.x < searchRadius) {
            this.vel.x += searchRadius / this.pos.x
        } else if (this.pos.x > canvas.width - searchRadius) {
            this.vel.x -= searchRadius / (canvas.width - this.pos.x)
        }

        if (this.pos.y < searchRadius) {
            this.vel.y += searchRadius / this.pos.y
        } else if (this.pos.y > canvas.height - searchRadius) {
            this.vel.y -= searchRadius / (canvas.height - this.pos.y)
        }
    }

    move(
        canvas: HTMLCanvasElement,
        gravity: number,
        friction: number,
        maxSpeed: number,
        searchRadius: number
    ): void {
        this.vel.y += gravity
        this.vel.multiplyScalar(1 - friction)
        if (this.vel.magnitude() > maxSpeed) {
            this.vel.normalize()
            this.vel.multiplyScalar(maxSpeed)
        }

        this.pos.add(this.vel)

        if (this.pos.x < 0) {
            this.pos.x = 1
        } else if (this.pos.x > canvas.width) {
            this.pos.x = Math.floor(canvas.width - 1)
        }

        if (this.pos.y < 0) {
            this.pos.y = 1
        } else if (this.pos.y > canvas.height) {
            this.pos.y = Math.floor(canvas.height - 1)
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2)
        ctx.fill()
    }
}

export default Fluid
