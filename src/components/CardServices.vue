<template> 
    <section class="flex justify-start items-center">
        <div :class="aberto ? 'h-96' : 'h-15' " class="overflow-hidden min-w-210 mx-5 border border-raisinBlack transition-all duration-400 rounded-lg shadow-sm bg-white">
            <div @click="ToggleAberto" class="flex justify-between cursor-pointer px-10">  
                <span class="font-montserrat font-bold text-2xl p-3">Chanel</span>
                <i :class="aberto ? 'rotate-180' : 'rotate-none'" class="bi-chevron-down cursor-pointer text-2xl p-3 transition-all duration-300"></i>
            </div>
            <div class="flex justify-evenly">
                <div class="flex flex-col items-left gap-2" :class="aberto ? 'translate-y-20 transition-all duration-300' : 'translate-y--20 transition-all duration-300'">
                    <div><i class="bi bi-cash-coin  ml-10"></i><span class="font-montserrat text-xl ml-2 font-medium">Valor:</span><span class="font-montserrat text-xl"> R$ 120.00</span></div>
                    <div><i class="bi bi-stopwatch ml-10"></i><span class="font-montserrat text-xl ml-2 font-medium">Duração:</span><span class="font-montserrat text-xl"> 45min</span></div>
                    <div class="h-40 w-90"><i class="bi bi-journal-text ml-10"></i><span class="font-montserrat text-xl ml-2 font-medium">Descrição:</span><span class="font-montserrat text-lg text-justify"> Corte delicado com pontas feitas em tesoura.</span></div>
                </div>            
                <div class="relative w-[400px] h-full overflow-hidden rounded-lg"
                    @mousemove="moverLupa"
                    @mouseenter="mostrarLupa = true"
                    @mouseleave="mostrarLupa = false">
                    <img :class="aberto ? 'opacity-100 h-full' : 'opacity-20 h-0'" :src="aberto ? chanel : ''" alt="corte-chanel" class="object-cover w-full transition-transform duration-500 ease-out"
                        :style="{
                            transform: mostrarLupa ? 'scale(2)' : 'scale(1)',
                            transformOrigin: `${posicao.x}% ${posicao.y}%`,
                            cursor: mostrarLupa ? 'zoom-in' : 'default'
                        }"/>
                </div>
            </div>
        </div>   
        <i @click.prevent="EditService" class="bi bi-pencil cursor-pointer text-zomp text-2xl"></i>     
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
    const mostrarLupa = ref(false)
    const posicao = ref({ x:50, y:50 })

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

    const moverLupa = (e) => {
        const bounds = e.target.getBoundingClientRect()
        const x = ((e.clientX - bounds.left) / bounds.width) * 100
        const y = ((e.clientY - bounds.top) / bounds.height) * 100
        posicao.value = { x, y }
    }

    function EditService(){
        modal.openEditService(props.servico)
    }

</script>

<style scoped>
    /* zoom-in cursor mais visível */
    img {
        cursor: zoom-in;
    }
</style>