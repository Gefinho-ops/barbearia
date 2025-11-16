<template>
    <LableTableServices/>
    <div class="mt-3 flex gap-2.5">
        <CardServices v-for="servico in servicos" :key="servico.id" :servico="servico"/>
    </div>
    
    <div>
       <ModalAddService/>
       <ModalEditService/>
    </div>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import CardServices from '../../components/CardServices.vue';
    import LableTableServices from '../../components/LableTableServices.vue';
    import ModalAddService from '../../components/ModalAddService.vue';
    import ModalEditService from '../../components/ModalEditService.vue';

    //IMPORTAÇÃO DE MÓDULOS
    import { useBuscaStore } from '../../store/busca';
    import { ref, onMounted } from 'vue';

    const servicos = ref([])

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()

    //HOOK's
    onMounted(async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('servicos')

        const res = await fetch('/data/servicos.json', { cache: 'no-store' })
        servicos.value = await res.json()
    })
</script>