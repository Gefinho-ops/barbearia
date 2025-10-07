<script setup>
    import { useRoute } from 'vue-router'
    import { useAuthStore } from './store/auth'


    //instanciando a rota
    const route = useRoute()

    //instanciando a store
    const auth = useAuthStore()

</script>


<template>
    <div id="app" class="h-[100vh] font-montserrat">
        
        <router-view :key="$route.fullPath"/>
    </div>

</template>
