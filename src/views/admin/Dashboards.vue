<template>
    <section class="p-10 space-y-10">
        <h1 class="text-3xl mt-4 sm:text-4xl md:text-5xl lg:text-6xl font-montserrat 
            text-raisinBlack dark:text-ghostWhite ml-4 sm:ml-8 md:ml-16 lg:ml-10">
            Dashboards
            <span class="text-zomp font-montserrat"> gerais</span>
        </h1>

        <!-- Cards -->
        <div class="flex justify-center gap-5">
            <StaticCard titulo="Clientes" :valor="totalClientes" class="w-45" />
            <StaticCard titulo="Agendamentos do Dia" :valor="agendamentosDia" class="w-70"/>
            <StaticCard titulo="Semana" :valor="agendamentosSemana" class="w-45" />
            <StaticCard titulo="Mês" :valor="agendamentosMes" class="w-45" />
        </div>

        <!-- Gráfico: Agendamentos por mês -->
        <div class="bg-white dark:bg-raisinBlack p-5 rounded shadow">
            <GraficLine 
                titulo="Agendamentos por Mês"
                :labels="['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']"
                :dados="agendamentosPorMes"
            />
        </div>

        <!-- Linha com 2 gráficos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div class="bg-white dark:bg-raisinBlack p-5 rounded shadow">
                <GraficPie
                    titulo="Clientes Ativos x Inativos"
                    :labels="['Ativos', 'Inativos']"
                    :dados="[ativos, inativos]"
                />
            </div>

            <div class="bg-white dark:bg-raisinBlack p-5 rounded shadow">
                <GraficBar
                    titulo="Serviços mais realizados"
                    :labels="servicosLabels"
                    :dados="servicosQuantidades"
                />
            </div>

        </div>
 

    </section>
</template>

<script setup>
    import { ref, onMounted, computed } from "vue"
    import StaticCard from "../../components/StaticCard.vue"
    import GraficLine from "../../components/GraficLine.vue"
    import GraficBar from "../../components/GraficBar.vue"
    import GraficPie from "../../components/GraficPie.vue"

    // 📌 ESTADOS DO DASHBOARD
    const totalClientes = ref(0)
    const agendamentos = ref([])

    const ativos = ref(0)
    const inativos = ref(0)

    const agendamentosPorMes = ref([])

    const servicosLabels = ref([])
    const servicosQuantidades = ref([])

    //contador do dia
    const agendamentosDia = computed(() => {
        const hoje = new Date()
        const diaAtual = hoje.getDate()
        const mesAtual = hoje.getMonth() + 1
        const anoAtual = hoje.getFullYear()

        return agendamentos.value.filter(a => {
            const [ano, mes, dia] = a.data.split('/').map(Number)
            return dia === diaAtual && mes === mesAtual && ano === anoAtual
        }).length
    })

    //contador do mês
    const agendamentosMes = computed(() => {
        const hoje = new Date()
        return agendamentosPorMes.value.reduce((acc, curr, index) => {
            const mesAtual = hoje.getMonth()
            if (index === mesAtual) {
                return curr
            }
            return acc
        }, 0)
    })

    //contador da semana (segunda à sábado)
    const agendamentosSemana = computed(() => {
        const hoje = new Date()
        const diaDaSemana = hoje.getDay() // 0 = domingo, 1 = segunda, ..., 6 = sábado

        // Calcula a data da segunda-feira (início da semana)
        const segunda = new Date(hoje)
        const diferenca = diaDaSemana === 0 ? 6 : diaDaSemana - 1 // se domingo, volta 6 dias
        segunda.setDate(hoje.getDate() - diferenca)

        // Calcula a data do sábado (fim da semana)
        const sabado = new Date(segunda)
        sabado.setDate(segunda.getDate() + 5)

        // Normaliza as horas para comparar apenas as datas
        segunda.setHours(0, 0, 0, 0)
        sabado.setHours(23, 59, 59, 999)

        return agendamentos.value.filter(a => {
            const [ano, mes, dia] = a.data.split('/').map(Number)
            const dataAgendamento = new Date(ano, mes - 1, dia)

            return dataAgendamento >= segunda && dataAgendamento <= sabado
        }).length
    })

    // Carregamento real
    onMounted(async () => {

        // -----------------------
        // CLIENTES
        // -----------------------
        const clientesRes = await fetch("/data/clientes.json")
        const clientes = await clientesRes.json()

        totalClientes.value = clientes.length
        ativos.value = clientes.filter(c => c.status === "Ativo").length
        inativos.value = clientes.filter(c => c.status === "Inativo").length

        // -----------------------
        // AGENDAMENTOS
        // -----------------------
        const agRes = await fetch("/data/agendamentos.json")
        agendamentos.value = await agRes.json()

        // → Agendamentos por mês
        const meses = new Array(12).fill(0)
        agendamentos.value.forEach((a) => {
            const mes = Number(a.data.split("/")[1]) - 1
            meses[mes]++
        })

        agendamentosPorMes.value = meses

        // → Serviços mais feitos
        const mapa = {}
        agendamentos.value.forEach(a => {
            mapa[a.servico] = (mapa[a.servico] || 0) + 1
        })

        // CORREÇÃO AQUI
        servicosLabels.value = Object.keys(mapa)
        servicosQuantidades.value = Object.values(mapa)
    })
</script>
