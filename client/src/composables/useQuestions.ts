import { ref, onMounted } from 'vue';
import {Questionnaire} from "@/types/Questionnaire";

export default function useQuestions() {
    const loading = ref(false);
    const questions = ref<Questionnaire[]>([]);
    const error = ref<string | null>(null);

    const fetchQuestions = async () => {
        try {
            loading.value = true;
            const response = await fetch('/api/questions');

            if (!response.ok) {
                throw new Error('HTTP error, status ' + response.status);
            }

            const data: Questionnaire[] = await response.json();
            localStorage.setItem('CO2questions', JSON.stringify(data));
            questions.value = data;
            loading.value = false;
        } catch (err: unknown) {
            console.error("Fragen nicht gefunden!", err);
            error.value = 'Es ist ein Fehler aufgetreten!';
            loading.value = false;
        }
    };

    onMounted(async () => {
        await fetchQuestions();
    });

    return {
        fetchQuestions,
        loading: loading,
        questions: questions,
        error: error
    };
}
