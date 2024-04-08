import { ref } from 'vue';
import { Replies } from '@/types/Questionnaire';

export default function useCo2EmissionCalculator() {
    const loading = ref(false);
    const co2value = ref<Replies>({
        text: '',
        value: 0.0,
    });
    const error = ref<string | null>(null);

    /*
    nimmt ein Array der Werte entgegen, die zu den Antwortmöglichkeiten gehören,
    bildet daraus die Summe und gibt diese zurück
    */
    const calculateCo2Value = async (values: Array<number>) => {
        return values.reduce((acc, curr) => acc + curr, 0);
    };
    return {
        calculateCo2Value,
        co2value: co2value,
        loading: loading,
        error: error,
    };
}
