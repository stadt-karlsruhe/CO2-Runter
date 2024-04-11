import { ref, watch } from 'vue';
import useQuestions from '@/composables/useQuestions';

export default function useCo2EmissionCalculator() {
    const { questions } = useQuestions();
    const totalCo2Emission = ref(0.0);

    const calculateCo2Emission = () => {
        let total = 0.0;

        questions.value.category.forEach((category) => {
            category.questions.forEach((question) => {
                total += question.selected.value;
            });
        });
        totalCo2Emission.value = total;
    };

    calculateCo2Emission();

    return {
        totalCo2Emission,
    };
}
