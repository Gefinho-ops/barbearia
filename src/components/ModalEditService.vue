<template>
    <div v-if="open && servico" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-pictonBlue rounded-lg p-6 w-[1010px] h-[610px] relative">
            <div class="w-[1000px] h-[600px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
                <h3 class="font-montserrat font-bold text-pictonBlue dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">{{ servico.nome }}</h3>
                <div class="flex">
                    <div class="pl-10 pt-7"><img class="transform scale-110 rounded-lg" src="/src/assets/chanel.jpg" alt="corte-chanel"></div>
                    <div class="pt-25">
                        <div class="flex justify-evenly">
                            <span class=""><strong>Valor: R$ </strong>{{ servico.valor}}</span>
                            <span><strong>Duração: </strong>{{ servico.duracao}} min</span>
                        </div> 
                        <div class="flex justify-center pt-2"><strong>Profissional Executante: </strong>{{ servico.profissional}}</div>
                        <div class="pl-10 pr-5 text-justify pt-2 w-120 h-60"><strong>Descrição: </strong><em>{{ servico.descricao}}</em></div>
                        <div class="flex justify-end gap-5 pr-5 pt-2">
                            <button @click="reservService" class="p-1.5 rounded-lg cursor-pointer font-montserrat text-ghostWhite bg-zomp transition-shadow duration-300  hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Agendar este serviço</button>
                            <button  @click="close" tabindex="0" @keydown.enter="close" class="p-1.5 rounded-lg cursor-pointer font-montserrat text-ghostWhite bg-amaranth transition-shadow duration-300  hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Fechar</button>
                        </div>
                    </div>
                </div>

            </div>   
        </div>
    </div>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { computed } from 'vue';
    import { useModalStore } from '../store/modal';

    //INSTÂNCIAS
    const modal = useModalStore()

    //COMPUTED's
    const open = computed(() => modal.editServiceOpen)

    const servico = computed(() => modal.servicoEmEdicao)

    //FUNÇÕES
    function close(){
        modal.closeEditService()
    } 


    function reservService(){
        modal.openAgendamentoComServico(servico.value.nome)
        modal.closeEditService()
    }
</script>