<template>
  <tr class="border-b border-raisinBlack dark:border-ghostWhite">
    <td class="flex gap-[10px] p-[10px] flex-1">
      <div class="h-[50px] w-[50px] rounded-full" :class="props.cliente.status === 'Ativo' ? 'bg-zomp' : 'bg-amaranth'"></div>
      <div class="flex flex-col items-start">
        <h4 class="dark:text-ghostWhite">{{ cliente.nome }}</h4>
        <span class="text-gray-500">{{ cliente.email }}</span>
      </div>
    </td>

    <td class="p-[10px] flex-1 dark:text-ghostWhite">{{ formatarTelefone(cliente.telefone) }}</td>

    <td class="p-[10px] flex-1">
        <span :class="cliente.status === 'Ativo' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">{{ cliente.status }}</span>
    </td>

    <td class="p-[10px] flex-1 dark:text-ghostWhite">{{ cliente.endereco }}</td>
    <td class="flex-1">
      <a class="text-pictonBlue" href="#" @click.prevent="EditarCliente">Editar</a>
    </td>
  </tr>
</template>

<script setup>
    //IMPORTAÇÕES DE MÓDULOS
    import { useModalStore } from '../store/modal';
  

    //INSTÂNCIAS
    const modal = useModalStore()


    //DEFINIÇÃO DE PROPS
    const props = defineProps({
    cliente: {
        type: Object,
        required: true
    }
    })

    //FUNÇÕES
    function formatarTelefone(telefone) {
        if(!telefone) return ''

        // Remove todos os caracteres que não são dígitos
        const numeros = telefone.replace(/\D/g, '');

        if(numeros.length === 11) return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        
        if(numeros.length === 10) return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

        return telefone; // Retorna o telefone original se não for possível formatar
    }

    function EditarCliente(){
      modal.openEditClient(props.cliente)
    }
</script>