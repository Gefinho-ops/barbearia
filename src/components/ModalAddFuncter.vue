<template>
  <div
    v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-pictonBlue rounded-lg p-6 w-[800px] h-[500px] relative">
      <div class="w-[750px] h-[490px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
        <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">Adicionar <span class="text-pictonBlue">funcionário</span></h3>

        <form @submit.prevent="onSubmit" class="ml-10">
          <!-- LINHA 1 -->
          <div class="flex gap-5 mt-5">
            <div class="flex flex-1 flex-col">
              <input type="text" v-model="nome" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Nome:"/>
              <p class="text-sm text-red-500">{{ nomeError }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <input type="email" v-model="email" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Email:"/>
              <p class="text-sm text-red-500">{{ emailError }}</p>
            </div>
          </div>

          <!-- LINHA 2 -->
          <div class="flex gap-5 mt-5">
            <div class="flex flex-1 flex-col">
              <input v-mask="{ mask: '(00) 00000-0000' }" v-model="telefone" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Telefone:"/>
              <p class="text-sm text-red-500">{{ telefoneError }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <input type="text" v-model="endereco" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Endereço:"/>
            </div>
          </div>

          <!-- LINHA 3 -->
          <div class="flex gap-5 mt-5">
            <div class="flex flex-1 flex-col">
              <input type="text" v-model="cargo" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Cargo:"/>
              <p class="text-sm text-red-500">{{ cargoError }}</p>
            </div>

            <!-- ESPECIALIDADES -->
            <div class="flex flex-col mr-11">
              <button type="button" @click="toggleDropdown" class="flex justify-between items-center w-75 px-3 py-2 h-9 border border-pictonBlue rounded-lg bg-white dark:bg-raisinBlack dark:text-ghostWhite focus:ring-2 focus:ring-pictonBlue">
                <span>{{ especialidadesSelecionadas.length > 0 ? especialidadesSelecionadas.map(s => s.nome).join(", ") : "Selecione especialidades"}}</span>
                <i :class="dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi text-pictonBlue"></i>
              </button>

              <div v-if="dropdownOpen" class="absolute z-50 w-75 mt-11 max-h-48 overflow-y-auto border border-pictonBlue bg-white dark:bg-eerieBlack rounded-lg shadow-md">
                <div v-for="servico in servicos" :key="servico.id" class="flex items-center px-3 py-2 cursor-pointer hover:bg-pictonBlue hover:text-white transition-colors" @click="toggleSelecionado(servico)">
                  <input type="checkbox" :checked="isSelecionado(servico)" class="mr-2 accent-pictonBlue opacity-0" @change.stop/>
                  <span>{{ servico.nome }}</span>
                </div>
              </div>
                <p class="text-sm text-red-500">{{ especialidadesError }}</p>
            </div>
          </div>

          <!-- LINHA 4 -->
          <div class="flex gap-5 mt-5">
            <div class="flex flex-1 flex-col">
              <div class="flex">
                <label for="nascimento" class="mt-1 dark:text-ghostWhite font-montserrat">Data de nascimento:</label>
                <FlatPickr v-model="nascimento" :config="configData" id="nascimento" class="ml-1 dark:text-ghostWhite text-center font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[120px] focus:border-2"/>
              </div>
              <p class="text-sm text-red-500">{{ nascimentoError }}</p>
            </div>

            <div class="flex flex-1">
              <label for="genero" class="font-montserrat dark:text-ghostWhite mt-1">Gênero:</label>
              <div>
                <button type="button" @click="toggleGenero" id="genero" class="ml-1 dark:text-ghostWhite flex justify-evenly font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[150px] focus:border-2">
                  <span>{{ generoSelecionado || "Gênero:" }}</span>
                  <i :class="dropdownGenero ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi text-pictonBlue"></i>
                </button>

                <ul v-show="dropdownGenero" class="absolute ml-1 z-50 mt-1 w-[150px] max-h-[200px] overflow-y-auto border border-pictonBlue rounded-[10px] bg-white dark:bg-eerieBlack shadow-lg transition-all duration-300">
                  <li v-for="genero in generosDisponiveis" :key="genero" @click="selecionarGenero(genero)" class="px-3 py-2 cursor-pointer font-montserrat hover:bg-pictonBlue dark:text-raisinBlack hover:text-white rounded-[8px] transition-colors duration-200" :class="{ 'bg-pictonBlue text-white': generoSelecionado === genero, }">{{ genero }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- BOTÕES -->
          <div class="flex justify-end mt-10 gap-5">
            <button type="submit" class="text-ghostWhite bg-pictonBlue w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-cyan-500 hover:shadow-[0_0_8px_theme(colors.pictonBlue)]">Salvar</button>
            <button @click="close" class="mr-5 text-ghostWhite bg-amaranth w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Cancelar</button>
          </div>
        </form>
      </div>

      <button
        @click="close" tabindex="0" @keydown.enter="close" class="absolute right-0 top-[5px] rounded-r-[10px] p-[10px] px-[20px] cursor-pointer text-ghostWhite">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import FlatPickr from "vue-flatpickr-component"
import "flatpickr/dist/flatpickr.css"
import { Portuguese } from "flatpickr/dist/l10n/pt.js"
import * as yup from "yup"
import { useFormValidation } from "../composables/useFormValidation"
import { useFormaCacheStore } from "../composables/formCache"
import { useModalStore } from "../store/modal"
import { toast } from "vue3-toastify"
import mask from "../directives/mask"

// ===== SCHEMA =====
const schema = {
  nome: yup.string().required("O nome é obrigatório").min(3),
  email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido"),
  telefone: yup.string().required("O telefone é obrigatório").min(15),
  endereco: yup.string().nullable(),
  cargo: yup.string().required("O cargo é obrigatório"),
  especialidades: yup.array().min(1, "Selecione pelo menos uma especialidade").required('Especialidades são obrigatórias'),
  generoSelecionado: yup.string().required("Selecione um gênero"),
  nascimento: yup.string().required("Data obrigatória").min(10),
}

// ===== INSTÂNCIAS =====
const modal = useModalStore()
const formCache = useFormaCacheStore()
const { handleSubmit, createField, resetForm, values } = useFormValidation(schema)

// ===== CAMPOS =====
const { value: nome, errorMessage: nomeError } = createField("nome")
const { value: email, errorMessage: emailError } = createField("email")
const { value: telefone, errorMessage: telefoneError } = createField("telefone")
const { value: endereco } = createField("endereco")
const { value: cargo, errorMessage: cargoError } = createField("cargo")
const { value: especialidades, errorMessage: especialidadesError } = createField("especialidades")
const { value: nascimento, errorMessage: nascimentoError } = createField("nascimento")
const { value: generoSelecionado, errorMessage: generoError } = createField("generoSelecionado")

// ===== ESTADOS =====
const dropdownOpen = ref(false)
const dropdownGenero = ref(false)
const generosDisponiveis = ref(["Masculino", "Feminino", "Outro"])
const servicos = ref([
  { id: 1, nome: "Corte" },
  { id: 2, nome: "Barba" },
  { id: 3, nome: "Hidratação" },
  { id: 4, nome: "Sobrancelha" },
  { id: 5, nome: "Navalhado" },
  { id: 6, nome: "Social" },
])

// ===== COMPUTEDS =====
const especialidadesSelecionadas = computed(() => especialidades.value || [])
const open = computed(() => modal.addFuncterOpen)

// ===== CONFIG FLATPICKR =====
const configData = {
  locale: Portuguese,
  dateFormat: "d/m/Y",
  enableTime: false,
}

// ===== FUNÇÕES =====
const close = () => modal.closeAddFuncter()

const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)

const isSelecionado = servico =>
  especialidadesSelecionadas.value.some(s => s.id === servico.id)

const toggleSelecionado = servico => {
  const selecionadas = [...(especialidades.value || [])]
  const index = selecionadas.findIndex(s => s.id === servico.id)
  if (index > -1) {
    selecionadas.splice(index, 1)
  } else {
    selecionadas.push(servico)
  }
  especialidades.value = selecionadas
}

const toggleGenero = () => (dropdownGenero.value = !dropdownGenero.value)
const selecionarGenero = genero => {
  generoSelecionado.value = genero
  dropdownGenero.value = false
}

const onSubmit = handleSubmit(values => {
  console.log("Dados enviados:", values)
  toast.success("Funcionário adicionado com sucesso!")
  resetForm()
  close()
})

// ===== WATCHS =====
watch(values, novos => {
  formCache.salvarForm("funcionarioAdicionar", { ...novos })
}, { deep: true })

// ===== HOOK's =====
onMounted(() => {
    generoSelecionado.value = "Masculino"

  const cache = formCache.obterForm("funcionarioAdicionar")
  if (cache) resetForm({ values: cache })
})
</script>


