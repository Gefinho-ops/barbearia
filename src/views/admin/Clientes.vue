<template>
    <section>
        <LabelTableUsers/>
        <TableUsers class="mt-3" :clientes="clientesFiltrados"/>
        <div v-if="clientesFiltrados.length === 0" class="mt-6 text-center text-gray-500 dark:text-ghostWhite">
            Nenhum cliente encontrado
        </div>
        
        <div>
            <ModalAddClient/>
            <ModalEditClient/>
        </div>
        
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES    
    import TableUsers from '../../components/TableUsers.vue'
    import LabelTableUsers from '../../components/LabelTableUsers.vue'
    import ModalAddClient from '../../components/ModalAddClient.vue'
    import ModalEditClient from '../../components/ModalEditClient.vue'

    //IMPORTAÇÃO DE MÓDULOS
    import { ref, onMounted, computed, provide } from 'vue'
    import { useBuscaStore } from '../../store/busca'

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()
    
    //DEFINIÇÃO DE ESTADOS REATIVOS
    const clientes = ref([])

    provide('filtrosQuick', [
        { label: 'Clientes', value: 'clientes' },
    ])

    //COMPUTED's
    const clientesFiltrados = computed(() => {
        const termo = (buscaStore.termoDebounced || '').trim().toLowerCase()
        
        if(!termo) return clientes.value

        // tenta pegar do cache
        const cache = buscaStore.obterCache(termo)
        if (cache) return cache

        // senão, filtra e salva no cache
        const filtrados = clientes.value.filter(c => c.nome.toLowerCase().includes(termo))

        buscaStore.salvarCache(termo, filtrados)
        console.log(termo, filtrados)
        return filtrados
    })

    //HOOK's
    onMounted( async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('clientes')

        const res = await fetch('/data/clientes.json')
        clientes.value = await res.json()
    })

</script>