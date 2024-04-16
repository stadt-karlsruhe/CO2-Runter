<template>
    <v-container>
        <v-row
            class="d-flex flex-column-reverse flex-md-row my-16 justify-center"
        >
            <v-col cols="12" md="7" class="text-center text-md-start">
                <CurrentCO2 />
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_nature_m5ll.svg"
                />
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
import CurrentCO2 from '@/components/Calculator/CurrentCO2.vue';
</script>

<style scoped></style>
