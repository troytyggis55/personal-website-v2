<template>
    <div
        class="outer bg-white bg-opacity-25 overflow-hidden transition-all duration-300 w-full backdrop-filter backdrop-blur-sm shadow-xl"
    >
        <div class="h-full pl-5 pr-5 pb-5 overflow-auto overflow-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
    position: sticky;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px 0 0 10px;
}

.outer:hover ::-webkit-scrollbar-thumb {
    background: rgba(134, 150, 220, 0.77);
}
</style>
