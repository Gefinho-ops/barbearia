<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-pictonBlue rounded-lg p-6 w-[800px] h-[450px] relative">
            <div class="w-[750px] h-[440px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
                <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">Editar <span class="text-pictonBlue">serviço</span></h3>
                <form @submit.prevent="onSubmit" class="ml-10">

                    <div class="flex gap-5 mt-5">
                        <div class="flex flex-1 flex-col">
                            <input type="text" v-model="nome" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Nome:">
                            <p class="text-sm text-red-500">{{nomeError}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <input type="email" v-model="email" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Email:">
                            <p class="text-sm text-red-500">{{emailError}}</p>
                        </div>
                    </div>

                    <div class="flex gap-5 mt-5">
                        <div class="flex flex-1 flex-col">
                            <input type="text" :value="telefone" @input="handleTelefoneInput" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Telefone:">
                            <p class="text-sm text-red-500">{{telefoneError}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <input type="text" v-model="endereco" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Endereço:">
                        </div>
                    </div>

                    <div class="flex gap-5 mt-5">
                        <div class="flex flex-1 flex-col">
                            <div class="flex">
                                <label for="nascimento" class="mt-1 dark:text-ghostWhite font-montserrat">Data de nascimento:</label>
                                <FlatPickr v-model="nascimento" :config="configData" id="nascimento" class="dark:text-ghostWhite ml-1 outline-none border border-pictonBlue rounded-[10px] w-[130px] h-[35px] p-[5px] font-montserrat" />
                            </div>
                            <p class="text-sm text-red-500">{{nascimentoError}}</p>
                        </div>
                        <div class="flex flex-1">
                            <label for="genero" class="font-montserrat dark:text-ghostWhite mt-1">Gênero: </label>
                            <div>
                                <button type="button" @click="toggleGenero" id="genero" class="flex items-center justify-between ml-1 w-[150px] px-3 py-2 border border-pictonBlue rounded-[10px] h-[35px] cursor-pointer bg-ghostWhite text-raisinBlack dark:bg-raisinBlack dark:text-ghostWhite text-left shadow-sm hover:shadow-md transition-all duration-300">
                                    <span class="text-raisinBlack dark:text-ghostWhite">{{ generoSelecionado || 'Gênero:' }}</span>
                                    <i :class="dropdown ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi text-pictonBlue"></i>
                                </button>

                                <ul v-show="dropdown" class="absolute ml-1 z-50 mt-1 w-[150px] max-h-[200px] overflow-y-auto border border-pictonBlue rounded-[10px] bg-white dark:bg-eerieBlack shadow-lg transition-all duration-300">
                                    <li v-for="genero in generosDisponiveis" :key="genero" @click="selecionarGenero(genero)" class="px-3 py-2 cursor-pointer font-montserrat hover:bg-pictonBlue dark:text-raisinBlack hover:text-white rounded-[8px] transition-colors duration-200" :class="generoSelecionado === genero ? 'bg-pictonBlue text-white' : 'dark:text-ghostWhite text-raisinBlack'">
                                        {{ genero }}
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="flex">
                                <input type="text" class="hidden dark:text-ghostWhite border border-pictonBlue outline-none rounded-[10px] w-[80px] h-[35px] p-[5px] font-montserrat" v-model="generoSelecionado" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-10 gap-5">
                        <button type="submit" class="text-ghostWhite bg-pictonBlue w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-cyan-500 hover:shadow-[0_0_8px_theme(colors.pictonBlue)]">Editar</button>
                        <button @click="close" class="mr-5 text-ghostWhite bg-amaranth w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Cancelar</button>
                    </div>
                </form>
            </div>
            <button @click="close" tabindex="0" @keydown.enter="close" class="absolute right-0 top-[5px] rounded-r-[10px] p-[10px] px-[20px] cursor-pointer transition-colors duration-300 text-ghostWhite">✕</button>
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

    //FUNÇÕES
    function close(){
        modal.closeEditService()
    } 
</script>