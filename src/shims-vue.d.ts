declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'noisejs' {
    export class Noise {
        constructor(seed?: number)
        seed(val: number): void
        simplex2(x: number, y: number): number
        simplex3(x: number, y: number, z: number): number
        perlin2(x: number, y: number): number
        perlin3(x: number, y: number, z: number): number
    }
}
