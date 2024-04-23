<template>
    <v-card class="text-primary" elevation="0">
        <v-card-title class="text-h5 text-primary-darken-1"
            >Dein aktueller CO₂-Fußabdruck beträgt:
            {{ totalCo2EmissionStore.total }}</v-card-title
        >
        <v-card-text class="text-secondary">
            Und Setzt sich wie folgt zusammen:
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const totalCo2EmissionStore = useTotalCo2EmissionStore();
</script>

<style scoped></style>
