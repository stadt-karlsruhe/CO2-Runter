<template>
    <v-card>
        <v-card-title>Chart</v-card-title>
        <v-card-text>
            <v-chart
                :option="chartOptions"
                autoresize
                :loading="loading"
                :loadingOptions="loadingOptions"
                style="height: 600px; width: 100%"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// TODO: https://github.com/stadt-karlsruhe/CO2-Runter/blob/main/client/src/components/Dashboard/ChartAvg.js
import { shallowRef, onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

interface DistrictFootprint {
    name: string;
    total: number;
}

const footprints_in_districts = ref<DistrictFootprint[]>([]);
const chartOptions = shallowRef(getData());
const loading = shallowRef(false);
const loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
};

const fetchFootprintsInDistricts = async () => {
    const response = await fetch('/api/foodprint/districts');
    const data: DistrictFootprint[] = await response.json();
    return data;
};

onMounted(async () => {
    footprints_in_districts.value = await fetchFootprintsInDistricts();
    chartOptions.value = getData();
});

function getData() {
    return {
        textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
        },
        dataset: {
            dimensions: ['name', 'total'],
            source: footprints_in_districts.value.map(
                (districtFootprint: DistrictFootprint) => ({
                    name: districtFootprint.name,
                    total: districtFootprint.total,
                })
            ),
        },
        xAxis: {},
        yAxis: { type: 'category' },
        series: [{ type: 'bar' }],
    };
}
</script>

<style scoped></style>

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
