<template>
    <v-expansion-panels>
        <v-expansion-panel
            text="Dein Fußabdruck setzt sich wie folgt zusammen:"
            :title="
                'Aktueller CO2-Fußabdruck: ' +
                calculateTotalCo2Emission +
                ' kg CO2'
            "
        >
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>
import useQuestions from '@/composables/useQuestions';

const { calculateTotalCo2Emission } = useQuestions();
</script>

<style scoped></style>
