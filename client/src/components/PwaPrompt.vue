<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

// Define reactive property
const deferredPrompt = ref<any>(null);

// Event listeners
const beforeInstallPromptHandler = (e: Event) => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
};

const appInstalledHandler = () => {
    deferredPrompt.value = null;
};

// Attach event listeners on component setup
onBeforeMount(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    window.addEventListener('appinstalled', appInstalledHandler);
});

// Define methods
const dismiss = () => {
    deferredPrompt.value = null;
};

const install = () => {
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt();
    }
};
</script>

<template>
    <v-alert
        v-if="deferredPrompt"
        icon="mdi-download"
        color="primary-darken-1"
        title="Alert title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
    >
        <br />
        <v-btn @click="dismiss">Dismiss</v-btn>
        <v-btn @click="install">Install</v-btn>
    </v-alert>

    <v-banner
        v-if="deferredPrompt"
        lines="one"
        icon="mdi-download"
        color="primary"
    >
        <template v-slot:text>
            Willst du diese Webseite auf deinem Gerät installieren?
        </template>

        <template v-slot:actions>
            <v-btn @click="dismiss">Nein</v-btn>
            <v-btn @click="install">Ja, installieren</v-btn>
        </template>
    </v-banner>
</template>

<style scoped></style>
