import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
    const language = ref('no')
    const showEffects = ref(false)

    function toggleLanguage() {
        language.value = language.value === 'no' ? 'en' : 'no'
    }

    function toggleEffects() {
        showEffects.value = !showEffects.value
    }

    return { showEffects, toggleEffects, language, toggleLanguage }
})
