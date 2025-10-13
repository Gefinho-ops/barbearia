import IMask from "imask";

export default {
    mounted(el, binding) {
        const maskOptions = binding.value || {}
        el._mask = IMask(el, maskOptions)
    },
    updated(el, binding) {
        if(el._mask) return el._mask.updateOptions(binding.value)
    },
    unmounted(el) {
        if(el._mask) el._mask.destroy()
    }
}