import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    scheduleOpen: false,
    newSlashOpen: false,
    addClientOpen: false,

    editClientOpen: false,
    clienteEmEdicao: null,
  }),

  actions: {
    //Controle do modal de agendamento
    open() { this.scheduleOpen = true },
    close() { this.scheduleOpen = false },
    toggle() { this.scheduleOpen = !this.scheduleOpen },

    //Controle do modal de corte rápido
    openNewSlash() { this.newSlashOpen = true},
    closeNewSlash() { this.newSlashOpen = false},
    toggleNewSlash() {this.newSlashOpen = !this.newSlashOpen},

    //Controle do modal de adicionar cliente
    openAddClient() { this.addClientOpen = true },
    closeAddClient() { this.addClientOpen = false },

    //Controle do modal de editar cliente
    openEditClient(cliente) { this.clienteEmEdicao = cliente, this.editClientOpen = true },
    closeEditClient() { this.clienteEmEdicao = null, this.editClientOpen = false },
  }
})
