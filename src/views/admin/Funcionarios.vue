<template>
    <section>
        <LabelTableFuncter/>
        <TableFuncter class="mt-3" :funcionarios="funcionariosFiltrados"/>
        <div v-if="funcionariosFiltrados.length === 0" class="mt-6 text-center text-gray-500 dark:text-ghostWhite">
            Nenhum funcionário encontrado
        </div>
            <ModalAddFuncter/>
            <ModalEditFuncter/>
        <div>

        </div>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { provide, onMounted, ref, computed } from 'vue'
    import { useBuscaStore } from '../../store/busca'

    //IMPORTAÇÃO DE COMPONENTES
    import LabelTableFuncter from '../../components/LabelTableFuncter.vue'
    import TableFuncter from '../../components/TableFuncter.vue'
    import ModalAddFuncter from '../../components/ModalAddFuncter.vue'
    import ModalEditFuncter from '../../components/ModalEditFuncter.vue'

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const funcionarios = ref([])

    provide('filtrosQuick', [
        { label: 'Funcionários', value: 'funcionarios' },
    ])
    

    //COMPUTED's
    const funcionariosFiltrados = computed(() => {
        const termo = (buscaStore.termoDebounced || '').trim().toLowerCase()
        
        if(!termo) return funcionarios.value

        // tenta pegar do cache
        const cache = buscaStore.obterCache(termo)
        if (cache) return cache

        // senão, filtra e salva no cache
        const filtrados = funcionarios.value.filter(c => c.nome.toLowerCase().includes(termo))

        buscaStore.salvarCache(termo, filtrados)
        console.log(termo, filtrados)
        return filtrados
    })

    //HOOK's
    onMounted( async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('funcionarios')

        const response = await fetch('/data/funcionarios.json')
        funcionarios.value = await response.json()
    })
</script>