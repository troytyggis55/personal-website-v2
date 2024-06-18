<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

const current = defineModel()

const isSelected = computed(() => current.value === props.value)

const select = () => {
    current.value = props.value
}
</script>

<template>
    <button
        @click="select"
        :class="{
            'p-2 border-b-2 border-blue-400': isSelected,
            'p-2 border-b-2 border-transparent hover:border-blue-200': !isSelected
        }"
        v-text="props.text"
    />
</template>
