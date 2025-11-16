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
        type: "doughnut",
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.titulo,
                    data: props.dados,
                    borderWidth: 3,
                    tension: 0.3,
                    backgroundColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(244, 63, 94, 1)'
                    ],
                    hoverOffset: 30
                }
            ]
        },
        options: {
            responsive: true,
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
