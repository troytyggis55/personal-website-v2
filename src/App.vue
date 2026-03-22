<script setup lang="ts">
import DemoNetwork from '@/components/DemoNetwork.vue'

import { useSessionStore } from './stores/session'
import { ref, watch } from 'vue'
import ButtonNetwork from '@/components/ButtonNetwork.vue'

const store = useSessionStore()
let state = ref(store.showEffects)

watch(
    () => store.showEffects,
    newVal => {
        state.value = newVal
    },
    { immediate: true }
)
</script>

<template>
    <Transition name="network">
        <DemoNetwork v-if="state" />
    </Transition>
    <ButtonNetwork />

    <header class="flex justify-between items-center mb-8 gap-4">
        <router-link to="/" class="flex flex-col gap-0.5">
            <h1 class="text-3xl sm:text-5xl text-white hover-glow leading-tight">
                Trygve Jørgensen
            </h1>
            <p class="text-sm text-white/50 tracking-wide">Masterstudent · NTNU</p>
        </router-link>
        <img
            src="/images/KvadratProfilbilde.jpeg"
            alt="Profilbilde"
            class="rounded-full shadow-xl size-20 sm:size-24 ring-2 ring-white/10"
        />
    </header>

    <RouterView />

    <footer
        class="mt-8 pt-6 pb-16 border-t border-white/10 flex flex-row items-center justify-center gap-5"
    >
        <div class="flex flex-col text-right text-sm text-white/60">
            <p class="leading-snug">+47 94 05 05 56</p>
            <a href="mailto:trygveabjo@gmail.com" class="leading-snug hover:text-white transition"
                >trygveabjo@gmail.com</a
            >
        </div>
        <div class="flex gap-3">
            <a href="https://github.com/troytyggis55" target="_blank" class="hover-glow">
                <img src="/src/svg/github.svg" alt="GitHub" class="h-8 opacity-80" />
            </a>
            <a
                href="https://www.linkedin.com/in/trygve-j%C3%B8rgensen-80b1b9259/"
                target="_blank"
                class="hover-glow"
            >
                <img src="/src/svg/linkedin.svg" alt="LinkedIn" class="h-8 opacity-80" />
            </a>
        </div>
    </footer>
</template>

<style scoped>
.network-enter-active,
.network-leave-active {
    transition: 0.5s;
}

.network-enter-from,
.network-leave-to {
    opacity: 0;
}
</style>
