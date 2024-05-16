<template>
    <v-container>
        <v-row
            class="d-flex flex-column-reverse flex-md-row mt-16 justify-center"
        >
            <v-col cols="12" class="text-center text-md-start">
                <v-card class="text-primary" elevation="0">
                    <h1 class="text-h5 text-primary-darken-1">
                        Dein CO₂-Fußabdruck beträgt:
                    </h1>
                    <h1 class="text-h4 text-primary-darken-1 font-weight-bold">
                        {{ totalCo2EmissionStore.total }}t
                    </h1>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="my-16">
            <v-col>
                <QuestionStepper />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import QuestionStepper from '@/components/Calculator/QuestionStepper.vue';
import { onMounted } from 'vue';
import useQuestions from '@/composables/useQuestions';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const { fetchQuestions } = useQuestions();
const totalCo2EmissionStore = useTotalCo2EmissionStore();

onMounted(async () => {
    await fetchQuestions();
    totalCo2EmissionStore.calculateCo2ValuesPerCategory();
});
</script>

<style scoped></style>
