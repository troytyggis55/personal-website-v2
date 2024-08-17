import Victor from 'victor'

class Network {
    pos: Victor
    vel: Victor
    searchRadius: number
    trueNeighbors: Network[]
    aboveNeighbors: Network[]
    belowNeighbors: Network[]
    leftNeighbors: Network[]
    rightNeighbors: Network[]

    constructor(x: number, y: number, dx: number, dy: number, sr: number) {
        this.pos = new Victor(x, y)
        this.vel = new Victor(dx, dy)
        this.searchRadius = Math.min(randRange(sr * 0.8, sr * 1.2), 200)

        this.trueNeighbors = []
        this.aboveNeighbors = []
        this.belowNeighbors = []
        this.leftNeighbors = []
        this.rightNeighbors = []
    }

    detect(nodes: Network[], canvas: HTMLCanvasElement) {
        this.trueNeighbors = []
        this.aboveNeighbors = []
        this.belowNeighbors = []
        this.leftNeighbors = []
        this.rightNeighbors = []
        let checkedNodes = nodes.slice()

        for (let node of checkedNodes) {
            if (node === this) {
                checkedNodes.splice(checkedNodes.indexOf(node), 1)
                continue
            }

            if (this.pos.distance(node.pos) < this.searchRadius) {
                this.trueNeighbors.push(node)
                checkedNodes.splice(checkedNodes.indexOf(node), 1)
            }
        }

        let distance: number

        if (this.pos.x < this.searchRadius) {
            for (let node of checkedNodes) {
                if (node.pos.x > canvas.width - this.searchRadius) {
                    distance = this.pos.distance(new Victor(node.pos.x - canvas.width, node.pos.y))
                    if (distance < this.searchRadius) {
                        this.leftNeighbors.push(node)
                        checkedNodes.splice(checkedNodes.indexOf(node), 1)
                    }
                }
            }
        } else if (this.pos.x > canvas.width - this.searchRadius) {
            for (let node of checkedNodes) {
                if (node.pos.x < this.searchRadius) {
                    distance = this.pos.distance(new Victor(node.pos.x + canvas.width, node.pos.y))
                    if (distance < this.searchRadius) {
                        this.rightNeighbors.push(node)
                        checkedNodes.splice(checkedNodes.indexOf(node), 1)
                    }
                }
            }
        }

        if (this.pos.y < this.searchRadius) {
            for (let node of checkedNodes) {
                if (node.pos.y > canvas.height - this.searchRadius) {
                    distance = this.pos.distance(new Victor(node.pos.x, node.pos.y - canvas.height))
                    if (distance < this.searchRadius) {
                        this.aboveNeighbors.push(node)
                        checkedNodes.splice(checkedNodes.indexOf(node), 1)
                    }
                }
            }
        } else if (this.pos.y > canvas.height - this.searchRadius) {
            for (let node of checkedNodes) {
                if (node.pos.y < this.searchRadius) {
                    distance = this.pos.distance(new Victor(node.pos.x, node.pos.y + canvas.height))
                    if (distance < this.searchRadius) {
                        this.belowNeighbors.push(node)
                        checkedNodes.splice(checkedNodes.indexOf(node), 1)
                    }
                }
            }
        }
    }

    move(canvas: HTMLCanvasElement) {
        this.pos.add(this.vel)

        if (this.pos.x < 0) {
            this.pos.x = canvas.width
        } else if (this.pos.x > canvas.width) {
            this.pos.x = 0
        }

        if (this.pos.y < 0) {
            this.pos.y = canvas.height
        } else if (this.pos.y > canvas.height) {
            this.pos.y = 0
        }
    }

    drawNode(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2, true)
        ctx.fill()
    }

    drawLines(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1

        for (let node of this.trueNeighbors) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(node.pos.x, node.pos.y)
            ctx.stroke()
        }

        for (let node of this.aboveNeighbors) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(node.pos.x, node.pos.y - canvas.height)
            ctx.stroke()
        }

        for (let node of this.belowNeighbors) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(node.pos.x, node.pos.y + canvas.height)
            ctx.stroke()
        }

        for (let node of this.leftNeighbors) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(node.pos.x - canvas.width, node.pos.y)
            ctx.stroke()
        }

        for (let node of this.rightNeighbors) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(node.pos.x + canvas.width, node.pos.y)
            ctx.stroke()
        }
    }
}

const randRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

export default Network
