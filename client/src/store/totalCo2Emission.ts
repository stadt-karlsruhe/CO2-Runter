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
            consume: [],
            housing: [],
            mobility: [],
            nutrition: [],
        } as FootprintResponse,
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
        updateCategories(
            category: keyof FootprintResponse,
            data: DistrictFootprint[]
        ) {
            this.categories[category] = data;
        },
        updateCo2ValuesPerCategory(newValue: FootprintEmissionPerCategory[]) {
            this.co2ValuesPerCategory = newValue;
        },
    },
});
