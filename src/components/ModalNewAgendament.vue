<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-zomp rounded-lg p-6 w-[800px] h-[600px] relative">
      <div class="w-[750px] h-[590px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
        <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite  text-[38px] pt-[30px] pl-[60px]">Criar <span class="font-montserrat text-zomp text-[38px]">agendamento</span></h3>
        <form @submit.prevent="onSubmit">
          <div class="flex justify-evenly mt-[25px]">

            <div class="flex flex-col">
              <input type="text" v-model="cliente" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Cliente:">
              <p class="text-sm text-red-500">{{clienteError}}</p>
            </div>
            <div class="flex flex-col">
              <input type="text" v-model="funcionario" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Funcionário:">
              <p class="text-sm text-red-500">{{funcionarioError}}</p>
            </div>
          </div>

          <div class="flex flex-1 mt-[15px]">
            <div class="flex flex-col">
              <div class="flex">
                <label for="data" class="dark:text-ghostWhite p-[5px] font-montserrat ml-[70px]">Selecione a data:</label>
                <FlatPickr v-model="dataSelecionada" :config="configData" id="data" class="dark:text-ghostWhite meu-input outline-none border border-zomp rounded-[10px] w-[130px] h-[35px] p-[5px] font-montserrat" />
              </div>
              <p class="text-sm text-red-500 ml-52">{{dataError}}</p>
            </div>
            
            
            <div class="flex flex-col relative ml-[55px]">
              <button type="button" @click="toggleHorario"
                class="flex items-center justify-between w-[220px] px-3 py-2 border border-zomp rounded-[10px] h-[35px] cursor-pointer bg-white dark:bg-ghostWhite dark:text-raisinBlack text-left shadow-sm hover:shadow-md transition-all duration-300">
                <span class="dark:text-raisinBlack">{{ horarioSelecionado || "Selecione um horário" }}</span>
                <i :class="dropdown ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi text-zomp"></i>
              </button>

              <!-- Dropdown -->
              <ul
                v-show="dropdown"
                class="absolute z-50 mt-10 w-[200px] max-h-[200px] overflow-y-auto border border-zomp rounded-[10px] bg-white dark:bg-eerieBlack shadow-lg transition-all duration-300">
                <li
                  v-for="hora in horariosDisponiveis"
                  :key="hora"
                  @click="selecionarHorario(hora)"
                  class="px-3 py-2 cursor-pointer font-montserrat hover:bg-zomp dark:text-raisinBlack hover:text-white rounded-[8px] transition-colors duration-200"
                  :class="horarioSelecionado === hora ? 'bg-zomp text-white' : 'dark:text-ghostWhite text-raisinBlack'"
                >
                  {{ hora }}
                </li>
              </ul>
              <div class="flex">
                <input type="text" class="hidden dark:text-ghostWhite border border-zomp outline-none rounded-[10px] w-[80px] h-[35px] p-[5px] font-montserrat" v-model="horarioSelecionado" readonly>
                <p class="text-sm text-red-500 mt-1">{{ horaError }}</p>
              </div>
            </div>
          </div>

          <div class="flex mt-[15px]">
            <div class="flex flex-col">
              <input type="text" v-model="servico" class="dark:text-ghostWhite ml-[45px] font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Serviço:">
              <p class="text-sm text-red-500 ml-11">{{servicoError}}</p>
            </div>
            <div class="flex">
              <label for="valor" class="dark:text-ghostWhite font-montserrat ml-[20px] mt-1">Valor: R$ </label>
              <input type="text" v-model="valor" id="valor" class="dark:text-ghostWhite ml-[5px] rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] h-[35px] focus:border-2" readonly>  
            </div>
            <div class="flex">
              <label for="duracao" class="dark:text-ghostWhite font-montserrat ml-[20px] mt-1">Duração:</label>
              <input type="text" v-model="duracao" id="duracao" class="dark:text-ghostWhite ml-[5px] rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] h-[35px] focus:border-2" readonly>
            </div> 
          </div>
          <div class="mt-[15px]">
            <textarea v-model="observacoes" name="" id="" class="dark:text-ghostWhite font-montserrat ml-[70px] border border-zomp resize-none outline-none w-[600px] h-[150px] p-[5px] rounded-[10px] focus:border-2" placeholder="Observações:"></textarea>
          </div>
          <div class="flex gap-[10px] mt-[25px] justify-end">
            <button type="submit" class="text-ghostWhite bg-zomp w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Agendar</button>
            <button @click="close" class="mr-[20px] text-ghostWhite bg-amaranth w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Cancelar</button>
          </div>
        </form>
          
      </div>
      <button @click="close" tabindex="0" @keydown.enter="close" class="absolute right-0 top-[5px] rounded-r-[10px] p-[10px] px-[20px] cursor-pointer transition-colors duration-300 text-ghostWhite">✕</button>
      
    </div>
  </div>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { computed, watch } from 'vue'
    import { useModalStore } from '../store/modal'
    import { ref } from 'vue'
    import FlatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'
    import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
    import { useFormValidation } from '../composables/useFormValidation'
    import * as yup from 'yup'

    //Define o schema yup com as regras de validação
    const schema = { 
        cliente: yup.string().required('O nome do cliente é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
        funcionario: yup.string().required('O nome do funcionário é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
        servico: yup.string().required('O serviço é obrigatório').min(3, 'O serviço deve ter pelo menos 3 caracteres'),
        dataSelecionada: yup.string().required('A data é obrigatória'),
        horarioSelecionado: yup.string().required('O horário é obrigatório'),
    }

    //INSTÂNCIAS
    const modal = useModalStore()
    const { handleSubmit, resetForm, createField } = useFormValidation(schema)

    
    //DEFINIÇÃO DE ESTADOS REATIVOS
    const { value: cliente, errorMessage: clienteError } = createField('cliente')
    const { value: funcionario, errorMessage: funcionarioError } = createField('funcionario')
    const { value: servico, errorMessage: servicoError } = createField('servico')
    const { value: dataSelecionada, errorMessage: dataError } = createField('dataSelecionada')
    const { value: horarioSelecionado, errorMessage: horaError } = createField('horarioSelecionado')

    const horariosDisponiveis = ref(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'])
    const dropdown = ref(false)

    //Funções
    const selecionarHorario = (hora) => {
      horarioSelecionado.value = hora
      dropdown.value = false
    }

    const toggleHorario = () => {
      dropdown.value = !dropdown.value
    }

    const onSubmit = handleSubmit((values) => {
      console.log('Formulário válido:', values)
      // aqui você pode enviar via API, por exemplo
      resetForm()
      modal.close()
    })

    const close = () => modal.close()

    //COMPUTED's
    const dataHoraCompleta = computed(() => {
      if (dataSelecionada.value && horarioSelecionado.value) {
        return `${dataSelecionada.value} ${horarioSelecionado.value}`
      }
      return null
    })

    const open = computed(() => modal.scheduleOpen)

    //WATCH's
    watch(() => open.value, (isOpen) => {                                     //watch para resetar o formulário quando fechar o modal
      if(!isOpen){
        resetForm()
      }
    })

    //Configurações do flatpickr
    const configData = {
      locale: Portuguese,  // idioma
      dateFormat: 'd/m/Y', // formato exibido
      enableTime: false,    // se quiser hora também
      time_24hr: false,     // 24h
    }

    const configHorario = {
      locale: Portuguese,  // idioma
      enableTime: true,    // se quiser hora também
      noCalendar: true,     // não mostra calendário
      dateFormat: 'H:i',    // formato só hora:minuto
      time_24hr: true       // 24h
    }
</script>
