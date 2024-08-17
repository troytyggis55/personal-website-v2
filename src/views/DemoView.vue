<template>
    <main class="flex flex-col gap-4">
        <h2>Programming Demos</h2>

        <ContainerCard>
            <div class="flex flex-row gap-6" :class="{ 'flex-col': isMediumScreen }">
                <select v-if="isMediumScreen" v-model="selectedDemo">
                    <option v-for="demo in demos" :key="demo.name" :value="demo.path">
                        {{ demo.name }}
                    </option>
                </select>
                <div class="flex flex-col min-w-48 border border-blue-400" v-else>
                    <div
                        v-for="demo in demos"
                        :key="demo.name"
                        @click="selectedDemo = demo.path"
                        :class="{ 'bg-blue-400': selectedDemo === demo.path }"
                        class="p-4 cursor-pointer text-lg"
                    >
                        {{ demo.name }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <router-view />
                </div>
            </div>
        </ContainerCard>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ContainerCard from '@/components/ContainerCard.vue'

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

const router = useRouter()
const selectedDemo = ref()

watch(selectedDemo, newDemoPath => {
    router.push({ path: newDemoPath })
})

const isMediumScreen = ref(window.innerWidth < 768)

onMounted(() => {
    window.addEventListener('resize', () => {
        isMediumScreen.value = window.innerWidth < 768
    })

    selectedDemo.value = router.currentRoute.value.name
    console.log(selectedDemo.value)
})
</script>
