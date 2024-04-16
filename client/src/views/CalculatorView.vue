<template>
    <v-container>
        <v-row
            class="d-flex flex-column-reverse flex-md-row my-16 justify-center"
        >
            <v-col class="text-center">
                <h1 class="text-primary-darken-1">Mein CO₂-Fußabdruck</h1>
            </v-col>
        </v-row>

        <v-row class="my-16">
            <v-col>
                <QuestionStepper />
            </v-col>
        </v-row>

        <v-row class="my-16">
            <v-col>
                <CurrentCO2 />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import QuestionStepper from '@/components/Calculator/QuestionStepper.vue';
import CurrentCO2 from '@/components/Calculator/CurrentCO2.vue';
</script>

<style scoped></style>
