<template>
    <section>
       <table class="w-[900px]">
            <thead class="border-b border-raisinBlack dark:border-ghostWhite">
                <tr>
                    <td class="font-bold p-2.5 flex-1 dark:text-ghostWhite">Perfil</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Telefone</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Cargo</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Endereço</td>
                    <td></td>
                </tr>
            </thead>
            <tbody class="border-b border-raisinBlack dark:border-ghostWhite">
                <TableFuncterRow v-for="funcionario in funcionarios" :key="funcionario.id" :funcionario="funcionario"/>
            </tbody>
        </table>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import TableFuncterRow from './TableFuncterRow.vue'

    //DEFINIÇÃO DE PROPS
    const props = defineProps({
        funcionarios: {
            type: Object,
            required: true
        }
    })
</script>