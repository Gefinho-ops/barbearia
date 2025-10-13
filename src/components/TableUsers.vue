<template>
    <section>
       <table class="w-[900px]">
            <thead class="border-b border-raisinBlack dark:border-ghostWhite">
                <tr>
                    <td class="font-bold p-2.5 flex-1 dark:text-ghostWhite">Perfil</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Telefone</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Status</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Endereço</td>
                    <td></td>
                </tr>
            </thead>
            <tbody class="border-b border-raisinBlack dark:border-ghostWhite">
                <TableUsersRow v-for="cliente in clientes" :key="cliente.id" :cliente="cliente"/>
            </tbody>
        </table>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import TableUsersRow from './TableUserRow.vue'

    //DEFINIÇÃO DE PROPS
    const props = defineProps({
        clientes: {
            type: Object,
            required: true
        }
    })
</script>