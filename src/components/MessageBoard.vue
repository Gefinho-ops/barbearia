<template>
    <section class="flex gap-5">
        <div>
            <label for="mensagens" class="font-montserrat dark:text-ghostWhite">Mensagem: </label>
            <select name="mensagens" id="mensagens" v-model="mensagem" class="bg-white p-2 rounded-sm outline-none border-2 border-transparent cursor-pointer focus:border-zomp">
                <option :value="aniversario">Aniversário</option>
                <option :value="inativo">Inativo</option>
                <option :value="promocao">Promoção</option>
                <option :value="sorteio">Sorteio</option>
                <option value="">Escrever</option>
            </select>
        </div>
        <textarea v-model="mensagemCustom" name="context-message" id="context-mensage" :readonly="!modoEscrita" class="w-150 h-25 outline-none bg-white p-2 rounded-sm font-montserrat text-md">{{ mensagem }}</textarea>
    </section>
</template>

<script setup>
    import { watch, ref } from 'vue';

    
    const aniversario = 'Parabéns pelo seu grande dia! E para te presentear, hoje você tem 10% de desconto no seu corte! Não perde essa...'
    const inativo = 'Oi, tem alguém aí? Quanto tempo faz que você não dá um talento no seu corte... marque seu agendamento e fique no estilo!'
    const promocao = 'Neste dia dos pais estamos com uma promoção incrível! Venha dar aquele talento no visual com 10% de desconto...'
    const sorteio = 'Parabéns! Você foi o grande sorteado do mês e ganhou um corte da sua escolha inteiramente grátis...'

    const mensagem = ref(aniversario)
    const mensagemCustom = ref(mensagem.value)
    const modoEscrita = ref(false)

    watch(mensagem, (nova) => {
        if(nova === ''){
            modoEscrita.value = true
            mensagemCustom.value = ''
        }else{
            modoEscrita.value = false
            mensagemCustom.value = nova
        }
    })

</script>