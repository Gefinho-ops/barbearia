<template>
    <LableBoardMessage/>
    <MessageBoard class="mt-5"/>
    <LableTableNotification v-model:filtro="tipoFiltro" :options="['Todos', 'Aniversariantes', 'Inativo']" class="mt-2"/>

    <div v-if="usuariosFiltrados.length === 0" class="mt-5 ml-10 text-gray-500 font-montserrat text-lg">

        <p v-if="tipoFiltro === 'Todos'">
           <span class="flex justify-center">Nenhum usuário encontrado.</span>
        </p>

        <p v-else-if="tipoFiltro === 'Aniversariantes'">
            <span class="flex justify-center">Nenhum aniversariante hoje.</span>
        </p>

        <p v-else-if="tipoFiltro === 'Inativos'">
            <span class="flex justify-center">Nenhum usuário inativo encontrado.</span>
        </p>

    </div>

    <TableNotification v-else :usuarios="usuariosFiltrados" class="mt-5"/>
</template>

<script setup>
    import LableBoardMessage from '../../components/LableBoardMessage.vue';
    import LableTableNotification from '../../components/LableTableNotification.vue';
    import MessageBoard from '../../components/MessageBoard.vue';
    import TableNotification from '../../components/TableNotification.vue';

    import { ref, onMounted, computed } from 'vue';
    import { useBuscaStore } from '../../store/busca';

    const buscaStore = useBuscaStore()

    const usuarios = ref([])

    const tipoFiltro = ref("Todos")

    const usuariosFiltrados = computed(() => {
        if (!usuarios.value.length) return []

        const filtro = tipoFiltro.value.toLowerCase()

        if (filtro === 'aniversariantes') {
            const hoje = new Date()
            const dia = hoje.getDate()
            const mes = hoje.getMonth() + 1

            return usuarios.value.filter((u) => {
            if (!u.nascimento) return false
            const [diaNasc, mesNasc] = u.nascimento.split('/').map(Number)
            return diaNasc === dia && mesNasc === mes
            })
        }

        if (filtro === 'inativos' || filtro === 'inativo') {
            return usuarios.value.filter(
            (u) => u.status?.toLowerCase() === 'inativo'
            )
        }

        return usuarios.value
        })

     

    async function buscarClientes() {
        try{
            const res = await fetch("/data/clientes.json")
            usuarios.value = await res.json()
        }catch(err){
            console.error("Erro ao buscar clientes:", err)
        }
        
    }


    function filtrarUsuarios(tipo) {
        tipoFiltro.value = tipo;    
    }

    onMounted( async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('clientes')
        
        await buscarClientes()

    })
    
</script>