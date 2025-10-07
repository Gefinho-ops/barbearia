<template>
    <section class="flex">
        <div class="imagen">
            <img class="h-[695px] w-[1000px] rounded-r-4xl" src="../assets/jovem-na-barbearia-aparando-cabelo.jpg" alt="template">
        </div>
        <div class="formulario mx-[25px] w-[480px] mt-[180px]">
            <h1 class="font-montserrat font-bold text-4xl mb-[30px]">Faça seu login</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col ">
                <div class="input flex flex-col">
                    <div><i class="bi bi-envelope-at relative left-[20px] text-zomp"></i><input v-model="email" type="text" placeholder="E-mail..." required class="pl-[25px] py-[5px] font-montserrat w-[400px] outline-none border border-zomp rounded-[6px] focus:border-2"></div>
                    <div><i class="bi bi-lock relative left-[20px] text-zomp"></i><input v-model="senha" type="password" placeholder="Senha..." required class="pl-[25px] py-[5px] mt-[10px] font-montserrat w-[400px] outline-none border border-zomp rounded-[6px] focus:border-2"></div>
                </div>
                <div class="flex justify-between">
                    <div class="mt-[10px]">
                        <input type="checkbox" id="lembrar" v-model="lembrar" class="ml-[15px] relative top-[3px]">
                        <label class="font-montserrat text-[12px]" for="lembrar">Lembrar de min</label>
                    </div>
                    <a class="mt-[10px] mr-[60px] font-montserrat text-[12px]" href="#">Esqueci minha senha</a>
                </div>
                <button class="w-[400px] rounded-[6px] border ml-[15px] mt-[10px] py-[5px] cursor-pointer border-transparent bg-green-500 text-ghostWhite hover:bg-green-600 transition" :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
                <p class="text-center mt-[10px]">Não tem conta ainda? <a href="#" class="text-pictonBlue">Crie agora</a> </p>

                <p v-if="authService.error" class="erro">{{ authService.error }}</p>
            </form>
        </div>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { useAuthService } from '../composables/useAuthService'
    import { useRoute, useRouter } from 'vue-router'
    import { toast } from 'vue3-toastify'

    //INSTÂNCIAS
    const auth = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const authService = useAuthService()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const email = ref('')
    const senha = ref('')
    const lembrar = ref(false)
    const loading = ref(false)

    //FUNÇÕES
    async function handleLogin(){
        try {
            loading.value = true
            authService.clearError()

            await authService.login({ email: email.value, senha: senha.value })

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
            } else {
                toast.error('Erro durante o login')
            }
        } finally {
            loading.value = false
        }
    }
    
</script>


