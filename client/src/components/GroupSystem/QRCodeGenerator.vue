<template>QRCode Generator</template>

<script setup lang="ts">
//TODO: Add QRCode Generator

import { defineProps } from 'vue';

defineProps({
    text: {
        type: String,
        required: true,
    },
});
</script>

<style scoped></style>
