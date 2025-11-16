<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const props = defineProps({
    labels: Array,
    dados: Array,
    titulo: String
})

const canvas = ref(null)
let chart = null

function criarGrafico() {
    if (chart) chart.destroy()

    chart = new Chart(canvas.value, {
        type: "line",
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.titulo,
                    data: props.dados,
                    borderWidth: 3,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    })
}

onMounted(() => criarGrafico())

watch(() => [props.labels, props.dados], () => {
    criarGrafico()
})

onBeforeUnmount(() => chart?.destroy())
</script>
