<template>
    <section>
       <table class="min-w-211">
            <thead class="border-b border-raisinBlack dark:border-ghostWhite">
                <tr class="w-full">
                    <td class="font-bold p-2.5 flex-1 dark:text-ghostWhite">Perfil</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Telefone</td>
                    <td class="font-bold p-[10px] flex-1 dark:text-ghostWhite">Endereço</td>
                    <td></td>
                </tr>
            </thead>
            <tbody class="border-b border-raisinBlack dark:border-ghostWhite">
                <TableNotificationRow v-for="usuario in usuarios" :key="usuario.id" :usuario="usuario"/>
            </tbody>
        </table>
    </section>
</template>

<script setup>
    //IMPORTAÇÃO DE COMPONENTES
    import TableNotificationRow from './TableNotificationRow.vue';

    //DEFINIÇÃO DE PROPS
    const props = defineProps({
        usuarios: {
            type: Object,
            required: true
        }
    })
</script>