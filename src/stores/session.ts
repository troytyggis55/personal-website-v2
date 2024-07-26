import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
    const language = ref('no')

    function toggleLanguage() {
        language.value = language.value === 'no' ? 'en' : 'no'
    }

    return { language, toggleLanguage }
})
