<template>QRCode Generator</template>

<script setup lang="ts">
//TODO: Add QRCode Generator
// https://github.com/stadt-karlsruhe/CO2-Runter/blob/main/client/src/components/Group/QRCodeGenerator.js

import { defineProps } from 'vue';

defineProps({
    text: {
        type: String,
        required: true,
    },
});
</script>

<style scoped></style>
