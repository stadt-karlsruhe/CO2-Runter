<template>
    <v-card>
        <v-alert v-if="fetchError" type="error">{{ fetchError }}</v-alert>
        <v-card-text v-if="isLoading" class="text-center">
            <h1 class="text-primary-darken-1">{{ totalCo2Footprint }}</h1>
            <p>Abgegebene CO2-Fussabdrücke</p>
        </v-card-text>
        <v-card-text v-else class="text-center">
            <v-alert type="info"> Daten werden geladen... </v-alert>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';

const totalCo2Footprint = ref(0);
const fetchError = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    const { isFetching, error, data } = await useFetch(
        '/api/foodprint/total'
    ).json();
    isLoading.value = isFetching;

    // Check if there was an error with the fetch request
    if (error.value) {
        fetchError.value = 'An error occurred while fetching data.';
    } else {
        totalCo2Footprint.value = data.value[0].total;
    }
});
</script>

<style scoped></style>
