<template>
    <section class="flex items-center">
        <div class="flex-1">
            <FlatPickr v-model="dataLocal" :config="configData" @on-change="emitData" class="w-50 h-14 pl-15 outline-none text-2xl font-montserrat dark:text-ghostWhite"/><i class="bi bi-calendar-week dark:text-ghostWhite text-2xl relative right-48 cursor-pointer pointer-events-none"></i>
        </div>
        <div class="flex-1">
            <span class="font-montserrat text-xl dark:text-ghostWhite">Agendamentos do dia: </span><span class="font-montserrat text-xl text-zomp">{{totalDia}}</span>
        </div>
        <div class="flex-1">
            <span class="font-montserrat text-xl dark:text-ghostWhite">Agendamentos da Semena: </span><span class="font-montserrat text-xl text-zomp">{{totalSemana}}</span>
        </div>
        
        
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import FlatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'
    import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

    import { ref, onMounted } from 'vue'

    //DEFINIÇÃO DE EMIT's
    const emit = defineEmits(['update:data'])

    //DEFINIÇÃO DE PROP's
    const props = defineProps({
        totalDia: {
            type: Number,
            default: 0
        },
        totalSemana: {
            type: Number,
            default: 0
        }
    })


    //ESTADOS REATIVOS
    const dataLocal = ref(new Date())
    // const labelDia = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    // const diaSemana = dataLocal.getDay() === 0 ? 7 : dataLocal.getDay()
    // const diasParaDomingo = 7 - diaSemana
    


    //Configurações do flatpickr
    const configData = {
      locale: Portuguese,  // idioma
      dateFormat: 'd/m/Y', // formato exibido
 //     dateFormat: 'Y-m-d',  //formato ideal para envio ao back-end 
      enableTime: false,    // se quiser hora também
      time_24hr: false,     // 24h
    }
   
    //FUNÇõES
    function emitData(selectedDates){
        if(selectedDates.length > 0){
            emit('update:data', selectedDates[0])
        }
    
    }

</script>