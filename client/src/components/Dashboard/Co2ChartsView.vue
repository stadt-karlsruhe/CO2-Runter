<template>Chart</template>

<!--<template>-->
<!--    <div v-if="isLoading" style="text-align: center">-->
<!--        Daten werden geladen ...-->
<!--    </div>-->
<!--    &lt;!&ndash;    <div v-else-if="averageError.value || footprintsError.value" style="text-align: center;">Es ist ein Fehler&ndash;&gt;-->
<!--    &lt;!&ndash;        aufgetreten: {{ averageError ? averageError.message : footprintsError.message }}&ndash;&gt;-->
<!--    &lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <div v-else>-->
<!--        <v-chart-->
<!--            v-if="-->
<!--                footPrints.value &&-->
<!--                average.value &&-->
<!--                footPrints.value.length > 0 &&-->
<!--                average.value.length > 0-->
<!--            "-->
<!--            :options="getOption()"-->
<!--            class="chart"-->
<!--            auto-resize-->
<!--        />-->
<!--        <div v-else style="text-align: center">Keine Daten verfügbar</div>-->
<!--        <v-select-->
<!--            :items="footPrintItems"-->
<!--            v-if="!isLoading && !averageError.value && !footprintsError.value"-->
<!--            v-model="selectedFootprints"-->
<!--            label="Angezeigte Fußabdrücke wählen"-->
<!--            :multiple="true"-->
<!--            style="width: 250px; margin: auto"-->
<!--        />-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { ref, computed, watchEffect } from 'vue';-->
<!--import { use } from 'echarts/core';-->
<!--import { BarChart } from 'echarts/charts';-->
<!--import {-->
<!--    TitleComponent,-->
<!--    TooltipComponent,-->
<!--    GridComponent,-->
<!--    LegendComponent,-->
<!--} from 'echarts/components';-->
<!--import VChart from 'vue-echarts';-->
<!--import 'echarts/theme/dark';-->
<!--import { useFetch } from '@vueuse/core';-->

<!--use([-->
<!--    BarChart,-->
<!--    TitleComponent,-->
<!--    TooltipComponent,-->
<!--    GridComponent,-->
<!--    LegendComponent,-->
<!--]);-->

<!--let isLoading = ref(true);-->
<!--let selectedFootprints = ref([]);-->
<!--let footPrintItems = ref([]);-->

<!--const {-->
<!--    isFinished: isAverageFinished,-->
<!--    error: averageError,-->
<!--    data: average,-->
<!--} = useFetch('/api/dashboard/footprints/average');-->
<!--console.log(average);-->
<!--const {-->
<!--    isFinished: isFootprintsFinished,-->
<!--    error: footprintsError,-->
<!--    data: footPrints,-->
<!--} = useFetch('/api/dashboard/comparisonprints');-->
<!--console.log(footPrints);-->

<!--watchEffect(() => {-->
<!--    if (isAverageFinished.value && isFootprintsFinished.value) {-->
<!--        if (!(averageError.value || footprintsError.value)) {-->
<!--            isLoading.value = false;-->
<!--        }-->
<!--        footPrintItems.value = footPrints.value-->
<!--            ? footPrints.value.map((fp: any) => fp.name)-->
<!--            : [];-->
<!--    }-->
<!--});-->

<!--const getOption = () => ({-->
<!--    // configurations for ECharts-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.chart {-->
<!--    height: 100vh;-->
<!--}-->
<!--</style>-->
<script setup lang="ts"></script>
