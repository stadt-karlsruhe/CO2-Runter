<template>
    <v-container class="justify-center">
        <v-row
            class="d-flex flex-column-reverse flex-md-row my-16 justify-center"
        >
            <h1 class="text-primary-darken-1">Calculator</h1>
        </v-row>
        <question-stepper />
    </v-container>
    <v-container class="ma-0">
        <current-c-o2 />
    </v-container>
</template>

<script setup lang="ts">
import QuestionStepper from '@/components/Calculator/QuestionStepper.vue';
import CurrentCO2 from '@/components/Calculator/CurrentCO2.vue';
</script>

<style scoped></style>
