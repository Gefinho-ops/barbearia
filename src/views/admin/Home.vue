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
    import { onMounted, ref, computed } from 'vue';
    import { useBuscaStore } from '../../store/busca';

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const agendamentos = ref([])
    const agendaDia = ref([])
    const dataHoje = ref(new Date())


    //COMPUTED`s
    const agendamentosFiltrados = computed(() => {
        if (!buscaStore.termo) return agendaDia.value

        const termo = buscaStore.termo.toLowerCase()
        
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