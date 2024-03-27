<template>
    <qrcode-vue :value="textToQrCode" :size="QrCodeSize" level="H" />
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';

import { defineProps } from 'vue';

defineProps({
    QrCodeSize: {
        type: Number,
        default: 200,
    },
    textToQrCode: {
        type: String,
        required: true,
    },
});
</script>

<style scoped></style>
