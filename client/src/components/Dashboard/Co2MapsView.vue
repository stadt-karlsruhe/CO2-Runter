<template>Maps</template>
<!--<template>-->
<!--    <v-chart-->
<!--        ref="map"-->
<!--        :option="option"-->
<!--        autoresize-->
<!--        style="background-color: #404a59"-->
<!--    />-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { use, registerMap } from 'echarts/core';-->
<!--import { ScatterChart, EffectScatterChart } from 'echarts/charts';-->
<!--import {-->
<!--    GeoComponent,-->
<!--    TitleComponent,-->
<!--    LegendComponent,-->
<!--    TooltipComponent,-->
<!--} from 'echarts/components';-->
<!--import { shallowRef } from 'vue';-->
<!--import getData from "./map";-->
<!--import chinaMap from './china.json';-->

<!--use([-->
<!--    ScatterChart,-->
<!--    EffectScatterChart,-->
<!--    GeoComponent,-->
<!--    TitleComponent,-->
<!--    LegendComponent,-->
<!--    TooltipComponent,-->
<!--]);-->

<!--registerMap('china', chinaMap as any);-->

<!--const option = shallowRef(getData());-->
<!--const map = shallowRef(null);-->
<!--const open = shallowRef(false);-->

<!--let img = null;-->

<!--function convert() {-->
<!--    img = {-->
<!--        src: map.value.getDataURL({-->
<!--            pixelRatio: window.devicePixelRatio || 1,-->
<!--        }),-->
<!--        width: map.value.getWidth(),-->
<!--        height: map.value.getHeight(),-->
<!--    };-->
<!--    open.value = true;-->
<!--}-->
<!--</script>-->

<!--<style scoped></style>-->
<script setup lang="ts">
</script>
