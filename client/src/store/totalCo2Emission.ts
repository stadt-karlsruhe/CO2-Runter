import { defineStore } from 'pinia';
import {
    FootprintEmissionPerCategory,
} from '@/types/Co2Footprint';
import useQuestions from '@/composables/useQuestions';
import { useQuestionStore } from '@/store/useQuestionStore';
import { QuestionsIndices } from '@/constants/QuestionsIndices';

export const useTotalCo2EmissionStore = defineStore('totalCo2Emission', {
    state: () => ({
        total: 0,
        dataSend: false,
        base: 0,
        // Type: Categories
        categories: {
            consume: 0,
            housing: 0,
            mobility: 0,
            nutrition: 0,
        },
        co2ValuesPerCategory: Array<FootprintEmissionPerCategory>(),
    }),

    actions: {
        updateDataSend(newValue: boolean) {
            this.dataSend = newValue;
        },
        recalculateTotalCo2Emission() {
            this.total =
                this.base +
                (this.categories.consume +
                    this.categories.housing +
                    this.categories.mobility +
                    this.categories.nutrition);
        },
        calculateCo2ValuesPerCategory() {
            const questionStore = useQuestionStore();
            this.base = questionStore.baseline;

            // calculate the total co2 emission per category
            const categoryTotals = questionStore.category.map((category) => {
                // Collect all selected question values within the category
                const questionValues = category.questions.map(question => question.selected.value);
                console.log("Selected Values per Category", questionValues);
                // Convert string formula to a callable function and evaluate it
                const calculateCategoryTotal = eval(`(${category.formula})`);
                const categoryTotal = calculateCategoryTotal(questionValues);

                // Return a new object detailing the category and its total emissions
                return {
                    categoryName: category.name,
                    totalEmission: categoryTotal,
                };
            });

            this.categories.mobility = categoryTotals[QuestionsIndices.MOBILITY].totalEmission;
            this.categories.nutrition = categoryTotals[QuestionsIndices.NUTRITION].totalEmission;
            this.categories.consume = categoryTotals[QuestionsIndices.CONSUM].totalEmission;
            this.categories.housing = categoryTotals[QuestionsIndices.LIVING].totalEmission;

            console.log("Category Totals", this.categories);

            this.recalculateTotalCo2Emission();

            console.log("Total", this.total);

            return categoryTotals;
        },
    },
});
