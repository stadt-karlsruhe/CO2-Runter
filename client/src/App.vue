<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core'



const loading = ref(false);
const questions = ref(null);

onMounted(async () => {
    const { isFetching, error, data } = await useFetch('/api/questions');
    console.log(data.value);
    // console.log('Hallo');
    // try {
    //     loading.value = true;
    //     const response = await fetch('/api/questions'); // Ensure you're using the correct URL
    //     if (!response.ok) throw new Error('HTTP error');
    //
    //     const text = await response.text();
    //     console.log(text); // print out the text
    //
    //     const data = JSON.parse(text);
    //     console.log(data); // print out the text
    //
    //     questions.value = data;
    //
    //     loading.value = false;
    // } catch (error) {
    //     loading.value = false;
    //     console.error(error);
    // }
});
</script>
