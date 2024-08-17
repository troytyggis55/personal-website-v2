<template>
    <div
        @click="toggleButton"
        class="fixed bottom-5 right-[5%] z-10 w-16 h-16 rounded-full flex justify-center items-center transition-all duration-500"
        :class="{ 'bg-gray-400': !state, 'bg-green-600': state}"
    >
        <button
            :class="{ 'toggle': state }"
            class="w-12 h-12 rounded-full flex justify-center items-center bg-blue-50 shadow-[0_0_8px_rgba(0,0,0,0.2)] transition-all duration-500"
        >
            <img src="../svg/sparkle.svg" alt="sparkle" class="w-10 h-10" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSessionStore } from '@/stores/session';

const store = useSessionStore();

const toggleButton = () => {
    store.toggleEffects();
}

let state = ref(store.showEffects)

watch(() => store.showEffects, (newVal) => {
    state.value = newVal
}, { immediate: true })
</script>

<style scoped>

.toggle {
    transform: rotate(360deg);
}
</style>
