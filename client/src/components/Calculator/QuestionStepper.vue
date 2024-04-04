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
                <QuestionsBlock />
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
                <QuestionsBlock />
            </v-stepper-window-item>

            <v-stepper-window-item value="3">
                <QuestionsBlock />
            </v-stepper-window-item>

            <v-stepper-window-item value="4">
                <QuestionsBlock />
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
import { ref } from 'vue';
import QuestionsBlock from '@/components/Calculator/QuestionsBlock.vue';

const step = ref(1);

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
