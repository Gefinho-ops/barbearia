<template>
    <LableTableServices/>
    <CardServices class="mt-3"/>

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
    import { onMounted } from 'vue';

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()

    //HOOK's
    onMounted(async() => {
        buscaStore.resetBusca()
        buscaStore.setTipoBusca('servicos')
    })
</script>