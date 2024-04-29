import { ref, onMounted } from 'vue';
import { Questionnaire, Replies } from '@/types/Questionnaire';
import { useQuestionStore } from '@/store/useQuestionStore';

export default function useQuestions() {
    const loading = ref(false);
    const questionStore = useQuestionStore();
    const questions = ref<Questionnaire>({
        baseline: 1.12,
        category: [
            {
                name: '',
                questions: [
                    {
                        text: '',
                        replies: [
                            {
                                text: '',
                                value: 0.0,
                            },
                        ],
                        selected: {
                            text: '',
                            value: 0.0,
                        },
                        formula: '',
                    },
                ],
                formula: '',
            },
        ],
        endFormula: '',
    });
    const error = ref<string | null>(null);

    const fetchQuestions = async () => {
        try {
            loading.value = true;
            const response = await fetch('/api/questions');

            if (!response.ok) {
                throw new Error('HTTP error, status ' + response.status);
            }

            const data: Questionnaire = await response.json();
            localStorage.setItem('CO2questions', JSON.stringify(data));
            questions.value = data;
            questionStore.setQuestions(data);
            loading.value = false;
        } catch (err: unknown) {
            console.error('Fragen nicht gefunden!', err);
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
        error: error,
    };
}
