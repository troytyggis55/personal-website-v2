<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import ContainerCarousel from '@/components/ContainerCarousel.vue'
import { ref } from 'vue'

const showDemo = ref(true)
</script>

<template>
    <main class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 justify-center">
            <ContainerCard>
                <MarkdownRenderer filename="AboutMe" />
                <br />
                <ContainerCarousel>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 1" />
                    </li>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 2" />
                    </li>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 3" />
                    </li>
                </ContainerCarousel>
            </ContainerCard>
            <ContainerCard class="md:max-w-md w-full">
                <DemoPathfinding v-if="showDemo" />
                <button
                    v-else
                    @click="showDemo = true"
                    class="text-5xl w-full h-full min-h-56 text-white border-white border hover:bg-blue-500 transition"
                >
                    Start Demo
                </button>

                <br />
                <div class="flex justify-center gap-2" v-if="showDemo">
                    <button
                        class="p-3 text-white border-white border hover:bg-blue-500 transition"
                        @click="showDemo = false"
                    >
                        Stop Demo
                    </button>
                    <router-link
                        to="/demo/pathfinding"
                        class="p-3 text-white border-white border hover:bg-blue-500 transition appearance-none"
                    >
                        <button>More Demos</button>
                    </router-link>
                </div>
            </ContainerCard>
        </div>
        <ContainerCard>
            <h2>Skills</h2>
            <div class="flex flex-row flex-wrap gap-10 justify-center">
                <img class="h-40 hover-glow" src="/src/svg/java.svg" alt="Java Logo" title="Java" />
                <img
                    class="h-40 hover-glow"
                    src="/src/svg/python.svg"
                    alt="Python Logo"
                    title="Python"
                />
                <img
                    class="h-40 hover-glow"
                    src="/src/svg/javascript.svg"
                    alt="JavaScript Logo"
                    title="JavaScript"
                />
                <img class="h-40 hover-glow" src="/src/svg/cpp.svg" alt="C++ Logo" title="C++" />
            </div>
        </ContainerCard>
    </main>
</template>

<style>
.hover-glow {
    transition: filter 0.2s;
}

.hover-glow:hover {
    filter: drop-shadow(0 0 10px white);
}
</style>
