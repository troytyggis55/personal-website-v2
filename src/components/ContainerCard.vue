<template>
    <div class="outer w-full">
        <div class="h-full p-6 overflow-auto overflow-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.outer {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transition: box-shadow 0.3s;
}

.outer:hover {
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
}

.outer:hover ::-webkit-scrollbar-thumb {
    background: rgba(134, 150, 220, 0.5);
}
</style>
