<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import ContainerCarousel from '@/components/ContainerCarousel.vue'
import { ref } from 'vue'

const showDemo = ref(true)
</script>

<template>
    <main class="flex flex-col gap-6">
        <div class="flex flex-col md:flex-row gap-6 justify-center">
            <ContainerCard>
                <MarkdownRenderer filename="AboutMe" />
                <br />
                <ContainerCarousel>
                    <li class="glide__slide items-center flex justify-center">
                        <img src="/images/aboutme/hs.jpg" alt="Hovedstyret" class="max-h-96" />
                    </li>
                    <li class="glide__slide items-center flex justify-center">
                        <img
                            src="/images/aboutme/snowboard.jpeg"
                            alt="Snowboard"
                            class="max-h-96"
                        />
                    </li>
                    <li class="glide__slide items-center flex justify-center">
                        <img src="/images/aboutme/vargalla.jpg " alt="Vårgalla" class="max-h-96" />
                    </li>
                </ContainerCarousel>
            </ContainerCard>
            <ContainerCard class="md:max-w-md w-full">
                <h2>Pathfinding</h2>
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
            <div class="flex flex-row flex-wrap gap-10 xl:gap-32 justify-center pb-10">
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/java.svg"
                    alt="Java Logo"
                    title="Java"
                />
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/cpp.svg"
                    alt="C++ Logo"
                    title="C++"
                />
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/python.svg"
                    alt="Python Logo"
                    title="Python"
                />
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/javascript.svg"
                    alt="JavaScript Logo"
                    title="JavaScript"
                />
                <img
                    src="/src/svg/typescript.svg"
                    alt="TypeScript Logo"
                    title="TypeScript"
                    class="h-20 md:h-40 hover-glow"
                />
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/vue.svg"
                    alt="Vue.js Logo"
                    title="Vue.js"
                />
                <img
                    class="h-20 md:h-40 hover-glow"
                    src="/src/svg/mysql.svg"
                    alt="MySQL Logo"
                    title="MySQL"
                />
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
