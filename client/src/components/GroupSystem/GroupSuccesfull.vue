<template>
    <div class="group">
        <h1>Ihre neue Gruppe {{ groupName }}</h1>
        <p>wurde erstellt</p>
        <p>
            Teilen Sie den Beitrittslink oder QR-Code mit ihren Freunden und
            fangen Sie an gemeinsam ihren CO2-Fußabdruck zu berechnen.
        </p>
        <p>Beitrittslink:</p>
        <button @click="copyToClipboard(joinLink)">{{ joinLink }}</button>
        <p>Dashboardlink:</p>
        <button @click="copyToClipboard(dashLink)">{{ dashLink }}</button>
        <p>Gruppen Code:</p>
        <button @click="copyToClipboard(groupCode)">{{ groupCode }}</button>

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

const rootUrl = window.location.origin;
const joinLink = computed(
    () => `${rootUrl}/CO2Rechner?groupcode=${props.groupCode}`
);
const dashLink = computed(
    () => `${rootUrl}/Dashboard?groupcode=${props.groupCode}`
);

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
