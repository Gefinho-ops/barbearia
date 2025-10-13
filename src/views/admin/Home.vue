<template>
    <section class="flex justify-between">
        <div class="flex flex-col">
            <LabelCardAgendament/>
            <div v-if="agendamentosFiltrados.length === 0" class="ml-[300px] font-montserrat text-[18px] p-4 text-gray-500">
                Nenhum agendamento encontrado.
            </div>
            <CardAgendaments v-for="item in agendamentosFiltrados" :key="item.id" :agendado="item" @servicoPrestado="adicionarCaixa"/>
        </div>
        
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import CardAgendaments from '../../components/CardAgendaments.vue';
    import LabelCardAgendament from '../../components/LabelCardAgendament.vue';

    //IMPORTAÇÃO DE MÓDULOS
    import { onMounted, onUnmounted, ref, computed, provide } from 'vue';
    import { useBuscaStore } from '../../store/busca';
    import { useSocket } from '../../composables/useSocket';

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()
    const { connect, disconnect, listen, emit, connected } = useSocket("http://localhost:3000")

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const agendamentos = ref([])
    const agendaDia = ref([])
    const dataHoje = ref(new Date())

    provide('filtrosQuick', [
        { label: 'Clientes', value: 'clientes' },
        { label: 'Funcionários', value: 'funcionarios' },
        { label: 'Serviços', value: 'sservicos' },
    ])



    //COMPUTED`s
    const agendamentosFiltrados = computed(() => {
        if (!buscaStore.termoDebounced) return agendaDia.value

        const termo = buscaStore.termoDebounced.toLowerCase()
        
        return agendaDia.value.filter(a => {
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
    onMounted(async () => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('clientes')

        try{
            const agenda = await fetch('/data/agendamentos.json')
            const dados = await agenda.json()

            const hojeString = dataHoje.value.toISOString().slice(0, 10).replace(/-/g, '/')

            agendaDia.value = [] // limpa antes
            dados.forEach(element => {
                if (element.data === hojeString) {
                    agendaDia.value.push(element)
                }
            })

            // depois ordena
            agendaDia.value.sort((a, b) => {
            const horaA = new Date(`1970-01-01T${a.horario}:00`)
            const horaB = new Date(`1970-01-01T${b.horario}:00`)
            return horaA - horaB
            })
        }catch (err){
            console.error('Erro ao buscar agendamentos', err)
        }
    })


</script>