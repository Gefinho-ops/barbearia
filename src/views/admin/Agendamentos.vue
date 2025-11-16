<template>
    <LabelTableAgendaments/>
    <AgendamentsContability :totalDia="totalDia" :totalSemana="totalSemana" @update:data="atualizarAgendamentos"/>

    <div>
        <div v-if="agendamentosFiltrados.length === 0" class="ml-[300px] font-montserrat text-[18px] p-4 text-gray-500">
                Nenhum agendamento encontrado.
        </div>
        <CardAgendaments v-for="item in agendamentosFiltrados" :key="item.id" :agendado="item"/>
    </div>
    
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import AgendamentsContability from '../../components/AgendamentsContability.vue';
    import CardAgendaments from '../../components/CardAgendaments.vue';
    import LabelTableAgendaments from '../../components/LabelTableAgendaments.vue';

    //IMPORTAÇÃO DE MÓDULOS
    import { ref, onMounted, computed } from 'vue';
    import { useFormaCacheStore } from '../../composables/formCache';
    import { useBuscaStore } from '../../store/busca';

    //INSTÂNCIAS
    const cacheStore = useFormaCacheStore()
    const buscaStore = useBuscaStore()

    //ESTADOS REATIVOS
    const totalDia = ref(0)
    const totalSemana = ref(0)

    const agDia = ref([])
    const agSemana = ref([])


    //FUNÇÕES
    function formatarData(date) {                                                                 // função utilitária pra converter data pro formato YYYY-MM-DD
        const ano = date.getFullYear()
        const mes = String(date.getMonth() + 1).padStart(2, '0')
        const dia = String(date.getDate()).padStart(2, '0')
        
        return `${ano}/${mes}/${dia}`
    }


    function gerarDatasSemana(dataBase) {                                               // gera as datas da semana com base em uma data de referência
        const diaSemana = dataBase.getDay() // 0 = domingo
        const domingo = new Date(dataBase)
        domingo.setDate(dataBase.getDate() - diaSemana)
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(domingo)
            d.setDate(domingo.getDate() + i)
            return formatarData(d)
        })
    }

    
    async function carregarAgendamentos() {
        const nomeCache = 'agendamentos'

        if(cacheStore.existeCache(nomeCache)){
            return cacheStore.obterForm(nomeCache)
        }

        const res = await fetch('/data/agendamentos.json', { cache: 'no-store' })
        const dados = await res.json()
        
        cacheStore.salvarForm(nomeCache, dados)
        return dados
        
    }


    async function atualizarAgendamentos(dataSelecionada = new Date()) {                         // faz as requisições
        const dataFormatada = formatarData(dataSelecionada)
        const dados = await carregarAgendamentos()

        // Filtro do dia
        agDia.value = dados.filter(item => item.data === dataFormatada).sort((a, b) => {const [ha, ma] = a.horario.split(':').map(Number)
            const [hb, mb] = b.horario.split(':').map(Number)
            return ha - hb || ma - mb })
        totalDia.value = agDia.value.length

        // Filtro da semana
        const datasSemana = gerarDatasSemana(dataSelecionada)
        agSemana.value = dados.filter(item => datasSemana.includes(item.data)).sort((a, b) => {const [ha, ma] = a.horario.split(':').map(Number)
            const [hb, mb] = b.horario.split(':').map(Number)
            return ha - hb || ma - mb})
        totalSemana.value = agSemana.value.length
    }

    
    //COMPUTED`s
    const agendamentosFiltrados = computed(() => {
        if (!buscaStore.termoDebounced) return agDia.value

        const termo = buscaStore.termoDebounced.toLowerCase()
        
        return agDia.value.filter(a => {
            switch(selectBusca.value) {
                case 'clientes':
                    return a.cliente.toLowerCase().includes(termo)
                case 'servicos':
                    return a.servico.toLowerCase().includes(termo)
                case 'funcionarios':
                    return a.funcionario.toLowerCase().includes(termo)
                default:
                    return true
            }
        })
    })


    //HOOK's
    onMounted( async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('clientes')
        
        atualizarAgendamentos()
    })

</script>