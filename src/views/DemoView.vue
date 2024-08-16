<template>
    <main class="flex flex-col gap-4">
        <h2>Programming Demos</h2>
        <select v-if="isMediumScreen" v-model="selectedDemo">
            <option v-for="demo in demos" :key="demo.name" :value="demo.path">
                {{ demo.name }}
            </option>
        </select>
        <div class="flex flex-col max-w-sm" v-else></div>

        <router-view />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const demos = [
    {
        name: 'Pathfinding',
        path: 'pathfinding'
    },
    {
        name: 'Fluid Simulation',
        path: 'fluid-simulation'
    }
]

const selectedDemo = ref(demos[0].path)
const router = useRouter()

watch(selectedDemo, newDemoPath => {
    router.push({ path: newDemoPath })
})

const isMediumScreen = ref(window.innerWidth < 768)

onMounted(() => {
    window.addEventListener('resize', () => {
        isMediumScreen.value = window.innerWidth < 768
    })
})
</script>
