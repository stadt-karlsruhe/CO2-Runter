import { defineStore } from 'pinia';
import {
    DistrictFootprint,
    FootprintEmissionPerCategory,
    FootprintResponse,
} from '@/types/Co2Footprint';

export const useTotalCo2EmissionStore = defineStore('totalCo2Emission', {
    state: () => ({
        total: 0,
        dataSend: false,
        categories: {
            consume: 2,
            housing: 3,
            mobility: 4,
            nutrition: 5,
        },
        co2ValuesPerCategory: Array<FootprintEmissionPerCategory>(),
    }),

    actions: {
        calculateTotalCo2Emission(newValue: number) {
            this.total = newValue;
            console.log('Total Co2 Emission:', this.total);
        },
        updateDataSend(newValue: boolean) {
            this.dataSend = newValue;
        },
        updateCategories(category: keyof FootprintResponse, value: number) {
            this.categories[category] = value;
        },
        updateCo2ValuesPerCategory(newValue: FootprintEmissionPerCategory[]) {
            this.co2ValuesPerCategory = newValue;
        },
        updateMobilityCategory(newValue: number) {
            this.categories.mobility = newValue;
            this.recalculateTotalCo2Emission();
        },
        updateNutritionCategory(newValue: number) {
            this.categories.mobility = newValue;
            this.recalculateTotalCo2Emission();
        },
        updateLivingCategory(newValue: number) {
            this.categories.mobility = newValue;
            this.recalculateTotalCo2Emission();
        },
        updateConsumCategory(newValue: number) {
            this.categories.mobility = newValue;
            this.recalculateTotalCo2Emission();
        },
        recalculateTotalCo2Emission() {
            this.total = this.categories.consume + this.categories.housing + this.categories.mobility + this.categories.nutrition;
        },
    },
});
