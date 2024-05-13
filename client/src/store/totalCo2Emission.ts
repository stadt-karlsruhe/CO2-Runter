import { defineStore } from 'pinia';
import { FootprintEmissionPerCategory } from '@/types/Co2Footprint';
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
            const actualTotal =
                this.base +
                (this.categories.consume +
                    this.categories.housing +
                    this.categories.mobility +
                    this.categories.nutrition);

            this.total = Math.round(actualTotal * 100) / 100;
        },
        calculateCo2ValuesPerCategory() {
            const questionStore = useQuestionStore();
            this.base = questionStore.baseline;

            // calculate the total co2 emission per category
            const categoryTotals = questionStore.category.map((category) => {
                // Collect all selected question values within the category
                const questionValues = category.questions.map((question) => {
                    if (question.formula) {
                        let result;
                        try {
                            const calculateQuestionValue = eval(
                                `(${question.formula})`
                            );
                            result = calculateQuestionValue(
                                question.selected.value
                            );
                        } catch (e) {
                            console.error(
                                'Error evaluating formula:',
                                question.formula,
                                'Error:',
                                e
                            );
                        }
                        return result;
                    } else {
                        return question.selected.value;
                    }
                });

                console.log('Selected Values per Category', questionValues);

                // Convert string formula to a callable function and evaluate it
                const calculateCategoryTotal = eval(`(${category.formula})`);
                const categoryTotal = calculateCategoryTotal(questionValues);

                // Return a new object detailing the category and its total emissions
                return {
                    categoryName: category.name,
                    totalEmission: categoryTotal,
                };
            });

            // Also round the values to 2 decimal places via Math.round * 100 / 100
            this.categories.mobility = Math.round(categoryTotals[QuestionsIndices.MOBILITY].totalEmission * 100) / 100;
            this.categories.nutrition = Math.round(categoryTotals[QuestionsIndices.NUTRITION].totalEmission * 100) / 100;
            this.categories.consume = Math.round(categoryTotals[QuestionsIndices.CONSUM].totalEmission * 100) / 100;
            this.categories.housing = Math.round(categoryTotals[QuestionsIndices.LIVING].totalEmission * 100) / 100;

            console.log('Category Totals', this.categories);

            this.recalculateTotalCo2Emission();

            console.log('Total', this.total);

            return categoryTotals;
        },
    },
});
