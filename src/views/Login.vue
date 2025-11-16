<template>
    <section class="flex">
        <div class="imagen">
            <img class="h-[695px] xl:w-[950px] lg:w-[750px] lg:block hidden rounded-r-4xl" src="../assets/jovem-na-barbearia-aparando-cabelo.jpg" alt="template">
        </div>
        <div class="formulario mx-[25px] w-[480px] my-auto  md:mx-auto sm:mx-auto">
            <h1 class="font-montserrat font-bold xl:text-4xl lg:text-3xl md:text-2xl md:text-center text-xl mb-[30px] dark:text-ghostWhite">Faça seu login</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col md:items-center">
                <div class="flex flex-col">
                    <div><i class="bi bi-envelope-at relative left-[20px] text-zomp"></i><input v-model="email" type="text" placeholder="E-mail..." required class="pl-[25px] py-[5px] font-montserrat xl:w-[400px] lg:w-[350px] md:w-[300px] sm:w-[460px] min-w-[300px] outline-none border border-zomp rounded-[6px] focus:border-2 dark:text-ghostWhite"></div>
                    <div><i :class="errado ? 'bi bi-lock relative left-[20px] text-amaranth' : 'bi bi-lock relative left-[20px] text-zomp'"></i><input v-model="senha" type="password" placeholder="Senha..." required @input="isDigit" :class="errado ? 'pl-[25px] py-[5px] mt-[10px] font-montserrat xl:w-[400px] lg:w-[350px] md:w-[300px] sm:w-[460px] min-w-[300px] outline-none border border-amaranth rounded-[6px] focus:border-2 dark:text-ghostWhite' : 'pl-[25px] py-[5px] mt-[10px] font-montserrat xl:w-[400px] lg:w-[350px] md:w-[300px] sm:w-[460px] min-w-[300px] outline-none border border-zomp rounded-[6px] focus:border-2 dark:text-ghostWhite'"></div>
                </div>
                <div class="flex justify-between md:justify-center lg:justify-between">
                    <div class="mt-[10px]">
                        <input type="checkbox" id="lembrar" v-model="lembrar" class="ml-[15px] relative top-[3px]">
                        <label class="font-montserrat text-[12px] dark:text-ghostWhite md:mr-12 lg:mr-24 xl:mr-36" for="lembrar">Lembrar de min</label>
                    </div>
                    <a class="mt-[10px] font-montserrat text-[12px] dark:text-ghostWhite" href="#">Esqueci minha senha</a>
                </div>
                <button class="xl:w-[400px] lg:w-[350px] md:w-[300px] min-w-[300px] rounded-[6px] border ml-[15px] mt-[10px] py-[5px] cursor-pointer border-transparent bg-green-500 text-ghostWhite hover:bg-green-600 transition" :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
                <p class="text-center text-[12px] mt-[10px] dark:text-ghostWhite xl:text-md lg:text-sm md:text-[12px]">Não tem conta ainda? <a href="#" class="text-pictonBlue">Crie agora</a> </p>

                <!-- <p v-if="authService.error" class="erro">{{ authService.error }}</p> -->
            </form>
        </div>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref, onMounted, watch } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { useAuthService } from '../composables/useAuthService'
    import { useRouter } from 'vue-router'
    import { toast } from 'vue3-toastify'
    import { eventBus } from '../config/eventBus'

    //INSTÂNCIAS
    const auth = useAuthStore()
    const router = useRouter()
    const authService = useAuthService()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const email = ref('')
    const senha = ref('')
    const lembrar = ref(false)
    const loading = ref(false)
    const errado = ref(false)
    const isDark = ref(false)


    //FUNÇÕES
    async function handleLogin(){
        try {
            loading.value = true
            errado.value = false
            authService.clearError()

            await authService.login({ email: email.value, senha: senha.value })

             // Se o checkbox estiver marcado, salva o email
            if (lembrar.value) {
            localStorage.setItem(
                'lembrarUsuario',
                JSON.stringify({ email: email.value })
            )
            } else {
            localStorage.removeItem('lembrarUsuario')
            }

            // Pequena pausa para garantir reatividade
            await new Promise(resolve => setTimeout(resolve, 50))

            // Redireciona baseado no role
            switch(auth.user?.role) {
                case 'admin':
                    router.replace('/admin/home')
                    break
                case 'funcionario':
                    router.replace('/funcionario/home')
                    break
                case 'cliente':
                    router.replace('/cliente/home')
                    break
                default:
                    router.replace('/login')
            }
            
        } catch (error) {
            if (authService.error) {
                toast.error(authService.error)
                errado.value = true
                senha.value = ''
            } else {
                toast.error('Erro durante o login')
            }
        } finally {
            loading.value = false
        }
    }

    const darkMode = () => {
        isDark.value = !isDark.value
    }


    const isDigit = () => {
        errado.value = false
    }

    //WATCH's
    watch(isDark, (val) => {
        const html = document.documentElement
        const theme = val ? 'dark' : 'light'
        html.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)

        eventBus.theme = theme
    })
    
    //HOOK's
    onMounted(() => {
       try {
        const saved = localStorage.getItem('lembrarUsuario')
        const savedLogin = saved ? JSON.parse(saved) : null

        if(savedLogin?.email){
            email.value = savedLogin.email
            lembrar.value = true
        }
        }catch(err){
            console.warn('Erro ao carregar login salvo:', err)
            localStorage.removeItem('lembrarUsuario')
        }

           
        const saved = localStorage.getItem('theme')
        if (saved) {
            isDark.value = saved === 'dark'
            eventBus.theme = saved
            document.documentElement.setAttribute('data-theme', saved)
        }
    
        
    })
</script>


