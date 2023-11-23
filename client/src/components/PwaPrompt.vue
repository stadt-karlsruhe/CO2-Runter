<script>
export default {
    name: 'App',
    data() {
        return {
            deferredPrompt: null,
        };
    },
    created() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
        });
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
        });
    },
    methods: {
        async dismiss() {
            this.deferredPrompt = null;
        },
        async install() {
            this.deferredPrompt.prompt();
        },
    },
};
</script>

<template>
    <v-alert
        v-if="deferredPrompt"
        icon="mdi-download"
        color="info"
        title="Alert title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
    >
        <br />
        <v-btn @click="dismiss">Dismiss</v-btn>
        <v-btn @click="install">Install</v-btn>
    </v-alert>
</template>

<style scoped></style>
