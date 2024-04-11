<template>
        <v-expansion-panels>
            <v-expansion-panel
                text="Dein Fußabdruck setzt sich wie folgt zusammen:"
                :title="
                    'Aktueller CO2-Fußabdruck: ' +
                    totalCo2EmissionStore.total +
                    ' kg CO2'
                "
            >
            </v-expansion-panel>
        </v-expansion-panels>
</template>

<script lang="ts" setup>
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const totalCo2EmissionStore = useTotalCo2EmissionStore();
</script>

<style scoped></style>
