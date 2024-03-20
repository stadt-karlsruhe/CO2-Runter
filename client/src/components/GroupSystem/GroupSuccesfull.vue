<template>
    <div>
        <h1 class="text-primary-darken-1">
            Ihre neue Gruppe {{ groupName }} wurde erstellt
        </h1>

        <p class="text-secondary my-8">
            Teilen Sie den Beitrittslink oder QR-Code mit ihren Freunden und
            fangen Sie an gemeinsam ihren CO2-Fußabdruck zu berechnen.
        </p>

        <div class="my-8">
            <v-text-field
                v-model="dashLink"
                label="Dashboardlink"
                :readonly="true"
                variant="outlined"
                prepend-inner-icon="mdi-open-in-new"
                append-inner-icon="mdi-content-copy"
                @click:append-inner="copyToClipboard(dashLink)"
                @click:prepend-inner="openLink(dashLink)"
            />

            <v-text-field
                v-model="joinLink"
                label="Joinlink"
                :readonly="true"
                variant="outlined"
                prepend-inner-icon="mdi-open-in-new"
                append-inner-icon="mdi-content-copy"
                @click:append-inner="copyToClipboard(joinLink)"
                @click:prepend-inner="openLink(joinLink)"
            />

            <v-text-field
                v-model="localGroupCode"
                label="Gruppen Code"
                :readonly="true"
                variant="outlined"
                append-inner-icon="mdi-content-copy"
                @click:append-inner="copyToClipboard(localGroupCode)"
            />
        </div>

        <QRCodeGenerator :text="joinLink" />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import QRCodeGenerator from '@/components/GroupSystem/QRCodeGenerator.vue';

const props = defineProps({
    groupCode: {
        type: String,
        required: true,
    },
    groupName: {
        type: String,
        required: true,
    },
});

const localGroupCode = computed(() => props.groupCode);

const rootUrl = window.location.origin;
const joinLink = computed(
    () => `${rootUrl}/CO2Rechner?groupcode=${props.groupCode}`
);
const dashLink = computed(
    () => `${rootUrl}/Dashboard?groupcode=${props.groupCode}`
);

const openLink = (link: string) => {
    window.open(link, '_blank');
};
const copyToClipboard = (text: string) => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log(`Text copied to clipboard: ${text}`);
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err);
        });
};
</script>

<style scoped></style>
