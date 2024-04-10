<template>
    <v-card>
        <v-card-title>Beteiligung pro Stadtteil</v-card-title>
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
import { shallowRef, onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { DistrictFootprint } from '@/types/DistrictFootprint';

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

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
