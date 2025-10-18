<template>
  <tr class="border-b border-raisinBlack dark:border-ghostWhite">
    <td class="flex gap-[10px] p-[10px] flex-1">
      <div class="h-[50px] w-[50px] rounded-full bg-zomp"></div>
      <div class="flex flex-col items-start">
        <h4 class="dark:text-ghostWhite">{{ funcionario.nome }}</h4>
        <span class="text-gray-500">{{ funcionario.email }}</span>
      </div>
    </td>

    <td class="p-[10px] flex-1 dark:text-ghostWhite">{{ formatarTelefone(funcionario.telefone) }}</td>

    <td class="p-[10px] flex-1 dark:text-ghostWhite">
        {{ funcionario.cargo }}
    </td>

    <td class="p-[10px] flex-1 dark:text-ghostWhite">{{ funcionario.endereco }}</td>
    <td class="flex-1">
      <div>
        <a class="text-pictonBlue" href="#" @click.prevent="EditarFuncionario">Editar</a>
      </div>
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
    funcionario: {
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

    function EditarFuncionario(){
      modal.openEditFuncter(props.funcionario)
    }
</script>