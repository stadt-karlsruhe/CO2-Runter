<template>
    <v-container class="justify-center">
        <v-row
            class="d-flex flex-column-reverse flex-md-row my-16 justify-center"
        >
            <h1 class="text-primary-darken-1">Mein CO₂-Fußabdruck {{totalCo2EmissionStore.total}}</h1>
        </v-row>

        <QuestionStepper />
    </v-container>

    <v-container class="ma-0">
        <CurrentCO2 />
    </v-container>
</template>

<script setup lang="ts">
import QuestionStepper from '@/components/Calculator/QuestionStepper.vue';
import CurrentCO2 from '@/components/Calculator/CurrentCO2.vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const totalCo2EmissionStore = useTotalCo2EmissionStore();
</script>

<style scoped></style>
