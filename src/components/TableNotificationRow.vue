<template>
        <tr class="border-b w-full border-raisinBlack dark:border-ghostWhite">
            <td class="gap-[10px] p-[10px] flex-1 text-left">
                <div class="flex gap-3">
                    <div class="h-[50px] w-[50px] rounded-full bg-zomp"></div>
                    <div class="flex flex-col items-start">
                        <h4 class="dark:text-ghostWhite">{{ usuario.nome }}</h4>
                        <span class="text-gray-500">{{ usuario.email }}</span>
                    </div>
                </div>
            </td>

            <td class="p-[10px] flex-1 dark:text-ghostWhite text-center">{{ formatarTelefone(usuario.telefone) }}</td>

            <td class="p-[10px] flex-1 dark:text-ghostWhite text-center">{{ usuario.endereco }}</td>
            <td class="flex-1 text-right">
                <a :class="enviado ? 'text-gray-500' : 'text-pictonBlue'" href="#" @click.prevent="sendMessage">{{ enviado ? "Enviado" : "Enviar" }}</a>
            </td>
        </tr>
</template>

<script setup>
    import { ref } from 'vue';

    const enviado = ref(false)

    const props = defineProps({
        usuario: {
            type: Object,
            required: true
        }
    })

    //FUNÇÕES
    async function sendMessage() {
        enviado.value = true
    }

    function formatarTelefone(telefone) {
        if(!telefone) return ''

        // Remove todos os caracteres que não são dígitos
        const numeros = telefone.replace(/\D/g, '');

        if(numeros.length === 11) return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        
        if(numeros.length === 10) return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

        return telefone; // Retorna o telefone original se não for possível formatar
    }
</script>