<template>
    <section>
        <table class="ml-[100px]">
            <thead class="font-montserrat">
                <tr>
                    <td>Nome</td>
                    <td>Telefone</td>
                    <td>Status</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="value in source">
                    <td>{{ cliente.nome }}</td>
                    <td>{{ cliente.telefone }}</td>
                    <td>{{ cliente.status }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
    defineProps({
        cliente: {
            type: Object,
            required: true
        }
    })
</script>