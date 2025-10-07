import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    scheduleOpen: false,
    newSlashOpen: false
  }),
  actions: {
    open() { this.scheduleOpen = true },
    close() { this.scheduleOpen = false },
    toggle() { this.scheduleOpen = !this.scheduleOpen },

    openNewSlash() { this.newSlashOpen = true},
    closeNewSlash() { this.newSlashOpen = false},
    toggleNewSlash() {this.newSlashOpen = !this.newSlashOpen}
  }
})
