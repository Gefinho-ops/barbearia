<template>
    <section class="flex gap-48 items-end">
        <h2 class="text-2xl mt-4 sm:text-4xl md:text-3xl lg:text-4xl font-montserrat 
            text-raisinBlack dark:text-ghostWhite ml-4 sm:ml-8 md:ml-16 lg:ml-10">
            Selecionar
        <span class="text-zomp font-montserrat"> usuários</span>
        </h2>
        <div>
            <label for="selection" class="dark:text-ghostWhite text-xl">Selecione: </label>
            <select v-model="filtroLocal" @change="emit('update:filtro', filtroLocal)" id="selection" class="bg-white p-2 rounded-sm outline-none border-2 border-transparent cursor-pointer focus:border-zomp">
                <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
        </div>
    </section>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        options: Array,
        filtro: String
    })


    const filtroLocal = ref(props.filtro || 'Todos')

    const emit = defineEmits(['update:filtro'])


   watch(() => props.filtro, (novo) => {
        filtroLocal.value = novo
   })

</script>