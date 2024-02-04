<template>
    <v-app>
        <v-main>
            <PwaPrompt />
            <TheNavigationHeader />
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import PwaPrompt from '@/components/PwaPrompt.vue';
import TheNavigationHeader from '@/components/TheNavigationHeader.vue';
import { ref, onMounted } from 'vue';

const loading = ref(false);
const questions = ref(null);

onMounted(async () => {
    console.log('Hallo');
    try {
        loading.value = true;
        const response = await fetch('/api/questions'); // Ensure you're using the correct URL
        if (!response.ok) throw new Error('HTTP error');

        const text = await response.text();
        console.log(text); // print out the text

        const data = JSON.parse(text);
        console.log(data); // print out the text

        questions.value = data;

        loading.value = false;
    } catch (error) {
        loading.value = false;
        console.error(error);
    }
});
</script>
