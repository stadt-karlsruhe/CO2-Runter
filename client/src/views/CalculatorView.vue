<template>
    <v-container class="justify-center">
        <v-row
            class="d-flex flex-column-reverse flex-md-row my-16 justify-center"
        >
            <h1 class="text-primary-darken-1">Co2 Fußabdruck Rechner</h1>
        </v-row>

        <QuestionStepper />
    </v-container>

    <v-container class="ma-0">
        <CurrentCO2 />
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import QuestionStepper from '@/components/Calculator/QuestionStepper.vue';
import CurrentCO2 from '@/components/Calculator/CurrentCO2.vue';
import useQuestions from '@/composables/useQuestions';

const { questions, fetchQuestions } = useQuestions();

onMounted(async () => {
    await fetchQuestions();
    console.log(questions.value);
});
</script>

<style scoped></style>
