<template>
    <v-dialog
        v-model="model"
        :close-on-content-click="false"
        transition="dialog-bottom-transition"
        width="600px"
    >
        <v-card class="rounded-xl">
            <div class="pa-8">
                <div class="text-h4 text-center">
                    <span class="font-weight-bold text-primary-darken-1"
                        >CO2Runter</span
                    >
                    installieren?
                </div>
                <v-list class="my-8" lines="three">
                    <v-list-item>
                        <template #prepend>
                            <v-avatar>
                                <v-icon color="primary-darken-1" size="x-large"
                                    >mdi-cellphone
                                </v-icon>
                            </v-avatar>
                        </template>

                        <v-list-item-title class="text-h6 mb-2"
                            >Mobilgeräte
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-body-1">
                            Nimm CO2Runter überall hin mit. Installiere die App
                            auf deinem Smartphone oder Tablet.
                        </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <template #prepend>
                            <v-avatar>
                                <v-icon color="primary-darken-1" size="x-large"
                                    >mdi-laptop
                                </v-icon>
                            </v-avatar>
                        </template>

                        <v-list-item-title class="text-h6 mb-2"
                            >Computer
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-body-1">
                            Installiere CO2Runter auf deinem Computer und
                            erhalte Benachrichtigungen.
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>

                <div class="d-flex justify-space-between">
                    <v-btn
                        class="rounded-lg"
                        color="primary-darken-1"
                        prepend-icon="mdi-close"
                        variant="plain"
                        @click.capture="dismiss()"
                        >Nein, danke
                    </v-btn>
                    <v-btn
                        append-icon="mdi-download"
                        class="px-8 py-4 d-flex align-center justify-center rounded-lg"
                        color="primary-darken-1"
                        variant="tonal"
                        @click.capture="install()"
                    >
                        Installieren
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted, defineExpose, ref } from 'vue';
import { defineModel } from 'vue';
import Cookies from 'js-cookie';

const model = defineModel<boolean>({
    required: true,
});

const deferredPrompt = ref<any>(null);

const beforeInstallPromptHandler = (e: Event) => {
    e.preventDefault();
    if (Cookies.get('add-to-home-screen') === undefined) {
        deferredPrompt.value = e;
    }
};

const appInstalledHandler = () => {
    deferredPrompt.value = null;
};

onBeforeMount(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    window.addEventListener('appinstalled', appInstalledHandler);
});

onUnmounted(() => {
    window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
    );
    window.removeEventListener('appinstalled', appInstalledHandler);
});

const dismiss = () => {
    Cookies.remove('add-to-home-screen');
    deferredPrompt.value = null;
    model.value = false;
};

const install = () => {
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt();
    }
};

// Expose your values
defineExpose({
    dismiss,
    install,
});
</script>

<style scoped lang="scss"></style>
