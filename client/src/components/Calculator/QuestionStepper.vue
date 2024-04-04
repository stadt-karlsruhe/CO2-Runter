<template>
    <v-stepper v-model="step" :alt-labels="true" elevation="0">
        <v-stepper-header>
            <v-stepper-item title="Mobilität" value="1"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Ernährung" value="2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Wohnen" value="3"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Konsum" value="4"></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
            <v-stepper-window-item value="1">
                <QuestionsBlock
                    v-if="data"
                    :questions="data.category[QuestionsIndices.MOBILITY]"
                />
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
                <QuestionsBlock
                    v-if="data"
                    :questions="data.category[QuestionsIndices.NUTRITION]"
                />
            </v-stepper-window-item>

            <v-stepper-window-item value="3">
                <QuestionsBlock
                    v-if="data"
                    :questions="data.category[QuestionsIndices.LIVING]"
                />
            </v-stepper-window-item>

            <v-stepper-window-item value="4">
                <QuestionsBlock
                    v-if="data"
                    :questions="data.category[QuestionsIndices.CONSUM]"
                />
            </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions>
            <template #prev>
                <v-btn @click="prev">zurück</v-btn>
            </template>

            <template #next>
                <v-btn @click="next">weiter</v-btn>
            </template>
        </v-stepper-actions>
    </v-stepper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QuestionsBlock from '@/components/Calculator/QuestionsBlock.vue';
import { QuestionsIndices } from '@/constants/QuestionsIndices';
import useQuestions from '@/composables/useQuestions';
import { Category, Questionnaire } from '@/types/Questionnaire';

const { questions, fetchQuestions } = useQuestions();
const step = ref(1);
const data = ref<Questionnaire>();

onMounted(async () => {
    await fetchQuestions();
    console.log(questions.value);
    data.value = questions.value;
});

const next = () => {
    if (step.value < 4) {
        step.value++;
    }
};

const prev = () => {
    if (step.value > 0) {
        step.value--;
    }
};
</script>

<style scoped></style>
