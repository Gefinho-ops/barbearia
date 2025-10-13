<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-zomp rounded-lg p-6 w-[800px] h-[340px] relative">
      <div class="w-[750px] h-[330px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
        <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">Corte <span class="font-montserrat text-zomp text-[38px]">rápido</span></h3>
        <form @submit.prevent="onSubmit">

          <div class="flex justify-evenly mt-[25px]">
            <div class="flex flex-col">
              <input type="text" v-model="cliente" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Cliente:">
              <p class="text-sm text-red-500 mt-1">{{ clienteError }}</p>
            </div>

            <div class="flex flex-col">
              <input type="text" v-model="funcionario" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Funcionário:">
              <p class="text-sm text-red-500 mt-1">{{ funcionarioError }}</p>
            </div>
          </div>

          <div class="flex mt-[15px]">
            <div class="flex flex-col">
              <input type="text" v-model="servico" class="dark:text-ghostWhite ml-[50px] font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Serviço:">
              <p class="text-sm text-red-500 ml-12">{{ servicoError }}</p>
            </div>
            
            <div class="flex">
              <label for="valor" class="dark:text-ghostWhite font-montserrat ml-[20px] mt-1">Valor: R$ </label>
              <input type="text" v-model="valor" id="valor" class="dark:text-ghostWhite rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] h-[35px] ml-1" readonly>
            </div>
            
            <div class="flex">
              <label for="" class="dark:text-ghostWhite font-montserrat ml-[20px] mt-1">Duração:</label>
              <input type="text" v-model="duracao" class="dark:text-ghostWhite ml-[5px] rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] h-[35px]" readonly>
            </div>
          </div>

          <div class="flex gap-[10px] mt-[25px] justify-end">
            <button type="submit" class="text-ghostWhite bg-zomp w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Agendar</button>
            <button @click="close" class="mr-[20px] text-ghostWhite bg-amaranth w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Cancelar</button>
          </div>
        </form>
          
      </div>
      <button @click="close" class="absolute right-0 top-[5px] rounded-r-[10px] p-[10px] px-[20px] cursor-pointer transition-colors duration-300 text-ghostWhite">✕</button>
      
    </div>
  </div>
</template>

<script setup>
    //IMPORTAÇÕES DE MÓDULOS
    import { computed, watch, ref, onMounted } from 'vue'
    import { useModalStore } from '../store/modal'
    import { useFormValidation } from '../composables/useFormValidation'
    import { useFormaCacheStore } from '../composables/formCache'
    import * as yup from 'yup'
    import { toast } from 'vue3-toastify'

    //Define o schema yup com as regras de validação
    const schema = { 
        cliente: yup.string().required('O nome do cliente é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
        funcionario: yup.string().required('O nome do funcionário é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
        servico: yup.string().required('O serviço é obrigatório').min(3, 'O serviço deve ter pelo menos 3 caracteres'),
    }

    //INSTÂNCIAS
    const modal = useModalStore()
    const { handleSubmit, values, resetForm, createField } = useFormValidation(schema)
    const formCache = useFormaCacheStore()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const {value: cliente, errorMessage: clienteError } = createField('cliente')
    const {value: funcionario, errorMessage: funcionarioError } = createField('funcionario')
    const {value: servico, errorMessage: servicoError } = createField('servico')

    //COMPUTED's
    const open = computed(() => modal.newSlashOpen)

    //FUNÇÕES
    const close = () => modal.closeNewSlash()

    const onSubmit = handleSubmit((values) => {
      console.log('Formulário válido:', values)
      // aqui você pode enviar via API, por exemplo
      formCache.limparForm('agendamentoFast')  // limpa o cache do formulário ao enviar
      resetForm()
      close()
      toast.success('Corte rápido criado com sucesso!')
    })

    //WATCH's
    watch(values, (novosDados) => {                                                // Sempre que o usuário alterar qualquer campo, salva no cache
      formCache.salvarForm('agendamentoFast', { ...novosDados })}, { deep: true })

    //HOOK's
    onMounted(() => {
      const cache = formCache.obterForm('agendamentoFast')
      if(cache){
        resetForm({values: cache})
      }
    })
</script>