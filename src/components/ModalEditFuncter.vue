 <template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-pictonBlue rounded-lg p-6 w-[800px] h-[450px] relative">
            <div class="w-[750px] h-[440px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
                <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">Editar <span class="text-pictonBlue">funcionário</span></h3>
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

                    <!-- LINHA 3 -->
                    <div class="flex gap-5 mt-5">
                        <div class="flex flex-1 flex-col">
                            <input type="text" v-model="cargo" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-pictonBlue w-[300px] focus:border-2" placeholder="Cargo:"/>
                            <p class="text-sm text-red-500">{{ cargoError }}</p>
                        </div>

                        <!-- ESPECIALIDADES -->
                        <div class="flex flex-col mr-11">
                        <button type="button" @click="toggleDropdown" class="flex justify-between items-center w-75 px-3 py-2 h-9 border border-pictonBlue rounded-lg bg-white dark:bg-raisinBlack dark:text-ghostWhite focus:ring-2 focus:ring-pictonBlue">
                            <span>{{ especialidadesSelecionadas > 0 ? especialidadesSelecionadas.map(s => s.nome).join(", ") : "Selecione especialidades"}}</span>
                            <i :class="dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'" class="bi text-pictonBlue"></i>
                        </button>

                        <div v-if="dropdownOpen" class="absolute z-50 w-75 mt-11 max-h-48 overflow-y-auto border border-pictonBlue bg-white dark:bg-eerieBlack rounded-lg shadow-md">
                            <div v-for="servico in servicos" :key="servico.id" class="flex items-center px-3 py-2 cursor-pointer hover:bg-pictonBlue hover:text-white transition-colors" @click="toggleSelecionado(servico)">
                            <input type="checkbox" :checked="isSelecionado(servico)" class="mr-2 accent-pictonBlue" @change.stop/>
                            <span>{{ servico.nome }}</span>
                            </div>
                        </div>
                            <p class="text-sm text-red-500">{{ especialidadesError }}</p>
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
    //IMPORTAÇÕES DE MÓDULOS
    import { useModalStore } from '../store/modal'
    import { computed, ref, watch, nextTick } from 'vue'
    import FlatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'
    import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
    import { useFormValidation } from '../composables/useFormValidation'
    import * as yup from 'yup'
    import { useFormaCacheStore } from '../composables/formCache'
    import mask from '../directives/mask'
    import { toast } from 'vue3-toastify'

    //Define o schema yup com as regras de validação
    const schema = {
        nome: yup.string().required('O nome do cliente é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
        email: yup.string().required('O E-mail é obrigatório').min(3, 'O E-mail deve ter pelo menos 3 caracteres'),
        telefone: yup.string().required('O telefone é obrigatório').min(13, 'O telefone deve conter 11 números'),
        endereco: yup.string().nullable(),
        generoSelecionado: yup.string().required('Selecione um gênero'),
        nascimento: yup.string().required('data de nascimento é obrigatória').min(10, 'Data inválida'),
    }

    //INSTÂNCIAS
    const modal = useModalStore()
    const formCache = useFormaCacheStore()
    const { handleSubmit, values,  resetForm, createField } = useFormValidation(schema)


    //ESTADOS REATIVOS
    const generosDisponiveis = ref(['Masculino', 'Feminino', 'Outro'])
    const dropdown = ref(false)
    const dropdownOpen = ref(false)

    const { value: nome, errorMessage: nomeError } = createField('nome')
    const { value: email, errorMessage: emailError } = createField('email')
    const { value: telefone, errorMessage: telefoneError } = createField('telefone')
    const { value: endereco } = createField('endereco')
    const { value: cargo, errorMessage: cargoError } = createField("cargo")
    const { value: especialidades, errorMessage: especialidadesError } = createField("especialidades")
    const { value: nascimento, errorMessage: nascimentoError } = createField('nascimento')
    const { value: generoSelecionado, errorMessage: generoError } = createField('generoSelecionado')

    const telefoneInput = ref(null)
    generoSelecionado.value = 'Masculino'

    const servicos = ref([
        { id: 1, nome: "Corte" },
        { id: 2, nome: "Barba" },
        { id: 3, nome: "Hidratação" },
        { id: 4, nome: "Sobrancelha" },
        { id: 5, nome: "Navalhado" },
        { id: 6, nome: "Social" },
    ])


    //Configurações do flatpickr
    const configData = {
      locale: Portuguese,  // idioma
      dateFormat: 'd/m/Y', // formato exibido
      enableTime: false,    // se quiser hora também
      time_24hr: false,     // 24h
    }

    //DEFINIÇÃO DE PROPS
    const props = defineProps({
        funcionario: {
            type: Object,
            required: true
        }
    })

    //FUNÇÕES
    function close() {
        modal.closeEditFuncter()
    }

    const selecionarGenero = (genero) => {
      generoSelecionado.value = genero
      dropdown.value = false
    }

    const toggleGenero = () => {
      dropdown.value = !dropdown.value
    }

    function formatTelefone(valor) {
        if (!valor) return ''
        const num = valor.replace(/\D/g, '')

        if (num.length <= 10) {
            // formato fixo
            return num.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
        } else {
            // formato celular
            return num.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
        }
    }

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


    function handleTelefoneInput(e) {
        const apenasNumeros = e.target.value.replace(/\D/g, '')
        telefone.value = formatTelefone(apenasNumeros)
    }

    const onSubmit = handleSubmit((val) => {
        console.log('Editando funcionario:', val)
        toast.success('Funcionário editado com sucesso!')
        resetForm()
        modal.closeEditClient()
    })


    //COMPUTED's
    const open = computed(() => modal.editFuncterOpen)

    const especialidadesSelecionadas = computed(() => especialidades.value || [])


    //WATCH's
    watch(() => modal.funcionarioEmEdicao, (funcionario) => {
        if(funcionario) resetForm({ values: funcionario })
    })


    // ✅ Watcher — pré-preenche os campos
    watch(() => modal.funcionarioEmEdicao, (funcionario) => {
        if (funcionario) {
            // Preenche os campos
            const funcionarioFormatado = {
                ...funcionario,
                telefone: formatTelefone(funcionario.telefone || ''),
            }
            resetForm({ values: funcionarioFormatado })
            }
        },
    { immediate: true })
</script>