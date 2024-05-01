<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';
import useQuestions from '@/composables/useQuestions';

const { fetchQuestions } = useQuestions();
const totalCo2EmissionStore = useTotalCo2EmissionStore();

onMounted(async () => {
    await fetchQuestions();
    totalCo2EmissionStore.calculateCo2ValuesPerCategory();
});
</script>

<style scoped></style>
