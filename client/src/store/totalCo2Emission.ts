import { defineStore } from 'pinia';

export const useTotalCo2EmissionStore = defineStore('totalCo2Emission', {
    state: () => ({
        total: 0,
    }),

    actions: {
        calculateTotalCo2Emission(newValue: number) {
            this.total = newValue;
            console.log('Total Co2 Emission:', this.total);
        },
    },
});
