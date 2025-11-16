<template>
    <div class="p-5 rounded-lg shadow bg-white dark:bg-raisinBlack">
        <h3 class="text-lg font-montserrat text-gray-600 dark:text-ghostWhite">{{ titulo }}</h3>
        <p class="text-3xl font-bold text-zomp mt-2">{{ valor }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    titulo: String,
    valor: [String, Number]
})
</script>
