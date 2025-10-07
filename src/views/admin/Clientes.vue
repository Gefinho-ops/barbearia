<template>
    <section>
        <div class="flex justify-around">
            <h1 class="text-[62px] text-raisinBlack">Tela de <span class="text-zomp">clientes</span></h1>
            <button class="bg-pictonBlue text-ghostWhite cursor-pointer h-[40px] relative top-[40px] p-[10px] rounded-[6px] transition-colors duration-300 hover:bg-blue-500">Adicionar cliente</button>
        </div>
        <table class="w-[900px]">
            <thead class="border-b border-raisinBlack">
                <tr>
                    <td class="font-bold p-2.5 flex-1">Perfil</td>
                    <td class="font-bold p-[10px] flex-1">Telefone</td>
                    <td class="font-bold p-[10px] flex-1">Status</td>
                    <td class="font-bold p-[10px] flex-1">Endereço</td>
                    <td></td>
                </tr>
            </thead>
            <tbody class="border-b border-raisinBlack">
                <tr>
                    <td class="flex gap-[10px] p-[10px] flex-1">
                        <div class="h-[50px] w-[50px] rounded-full bg-pictonBlue"></div>
                        <div class="flex flex-col items-start">
                            <h4>Jonas Cordeiro</h4>
                            <span class="text-gray-500">jonas.cordeiro@gmail.com</span>
                        </div>
                    </td>
                    <td class=" p-[10px] flex-1">(67) 99264-1574</td>
                    <td class=" p-[10px] flex-1">
                        <div class="h-[30px] w-[80px] rounded-[10px] border border-zomp bg-green-50 text-center">
                            <span class="text-green-600 font-bold">Ativo</span>
                        </div>
                    </td>
                    <td class=" p-[10px] flex-1">Rua Ciro Melo, 3128</td>
                    <td class="flex-1"><a class="text-pictonBlue" href="#">Editar</a></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup></script>