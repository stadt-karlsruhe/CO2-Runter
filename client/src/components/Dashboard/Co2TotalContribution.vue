<template>
    <v-card>
        <v-alert v-if="fetchError" type="error">{{ fetchError }}</v-alert>

        <v-card-text v-if="isLoading">
            <v-alert type="info" variant="tonal">
                Daten werden geladen...
            </v-alert>
        </v-card-text>

        <v-card-text
            v-else
            class="text-center d-flex align-center justify-center"
        >
            <v-icon class="text-primary-darken-1" size="32"
                >mdi-foot-print</v-icon
            >
            <h1 class="text-primary-darken-1">
                {{ totalCo2Footprint }} Abgegebene CO2-Fussabdrücke
            </h1>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';

const totalCo2Footprint = ref(0);
const fetchError = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    isLoading.value = true;
    const { isFetching, error, data } = await useFetch(
        '/api/foodprint/total'
    ).json();

    // Check if there was an error with the fetch request
    if (error.value) {
        fetchError.value = 'An error occurred while fetching data.';
    } else {
        totalCo2Footprint.value = data.value[0].total;
    }
    isLoading.value = false;
});
</script>

<style scoped></style>
