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
        type: "bar",
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.titulo,
                    data: props.dados,
                    borderWidth: 1,
                    tension: 0.3,
                    backgroundColor: [
                        'rgba(107, 114, 128, 1)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(29, 78, 216, 1)',
                        'rgba(250, 204, 21, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(244, 63, 94, 1)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    base: 0,
                    skipnulls: true,
                }], 
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: props.titulo
                }, 
                tooltip:{
                    callbacks: {
                        label (context) {
                            const label = context.label || ''
                            const valor = context.raw

                            return `${label}: ${valor}`
                        }
                    }
                }
            }
        }
    })
}

onMounted(() => criarGrafico())

watch(() => [props.labels, props.dados], () => {
    criarGrafico()
})

onBeforeUnmount(() => chart?.destroy())
</script>
