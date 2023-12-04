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
</script>
