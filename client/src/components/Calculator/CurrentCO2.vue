<template>
    <v-card color="primary" class="text-center" elevation="0">
        <v-card-title>Dein aktueller CO2-Wert beträgt:</v-card-title>
        <v-card-text class="text-h4 font-weight-bold text-primary-darken-1"
            >{{ totalCo2EmissionStore.total }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const totalCo2EmissionStore = useTotalCo2EmissionStore();
</script>

<style scoped></style>
