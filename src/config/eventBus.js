import { reactive } from "vue";

export const eventBus = reactive({theme:localStorage.getItem('theme') || 'light'})