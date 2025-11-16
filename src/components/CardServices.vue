<template> 
       <section class="overflow-y">
        <div class="border max-w-70 min-h-75 rounded-md cursor-pointer" @click="detalhesServico">
            <div class="w-full h-full"><img src="/src/assets/chanel.jpg" alt="corte-chanel"></div>
            <div class="w-full min-h-10 flex justify-center items-center border-b"><h2>{{ props.servico.nome }}</h2></div>
            <div class="flex justify-evenly items-center w-full min-h-10 p-1 ">
                <div class="flex-1">Valor: R$ {{ props.servico.valor }}</div>
                <div class="flex-1">Duração: {{ props.servico.duracao }} min</div>
            </div>
        </div>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref} from 'vue'
    import { useModalStore } from '../store/modal'

    //IMPORTAÇÃO DE IMAGENS
    import chanel from '../assets/chanel.jpg'
    import afro from '../assets/afro.jpg'
    
    //INSTÂNCIAS
    const modal = useModalStore()

    //ESTADOS REATIVOS
    const aberto = ref(false)
    

    //DEFINIÇÃO DE PROPS
    const props = defineProps({
        servico: {
            type: Object,
            required: true,
        }
    })

    //FUNÇÕES
    const ToggleAberto = () => {
        aberto.value = !aberto.value
    }

    const detalhesServico = () => {
        modal.openEditService(props.servico)
    }


</script>

