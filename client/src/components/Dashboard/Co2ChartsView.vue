<template>
    <v-card>
        <v-card-title>Chart</v-card-title>
        <v-card-text>
            <div v-if="loading">Daten werden geladen...</div>

            <div v-if="error">Es ist ein fehler aufgetreten: error</div>

            <v-chart
                v-if="footprints && average && footprints.length > 0 && average.length > 0"
                :option="chartOptions"
                autoresize
                :loading="loading"
                :loadingOptions="loadingOptions"
                style="height: 600px; width: 100%"
            />

            <v-select
                v-if="footprints && average && footprints.length > 0 && average.length > 0"
                v-model="selectedFootprints"
                :items="
                    footprints.map(
                        (districtFootprint) => districtFootprint.name
                    )
                "
                label="Angezeigte Fußabdrücke wählen"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// TODO: https://github.com/stadt-karlsruhe/CO2-Runter/blob/main/client/src/components/Dashboard/ChartAvg.js
import { shallowRef, onMounted, ref, computed } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { FootprintResponse } from '@/components/Dashboard/FootprintsAverageResponse';

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

const average = ref<FootprintResponse[]>([]);
const footprints = ref<any[]>([]);
let selectedFootprints = ref([]);
let isLoading = ref(true);
let error = ref(null);
const chartOptions = shallowRef(getData());

// const chartOptions = shallowRef(getData());
const loading = shallowRef(false);
const loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
};

const fetchData = async () => {
    try {
        const responseFootPrintsAvg = await fetch(
            '/api/dashboard/footprints/average'
        );
        average.value = await responseFootPrintsAvg.json();
        console.log(responseFootPrintsAvg.json());

        const responseComparision = await fetch(
            '/api/dashboard/footprints/comparisonprints'
        );
        footprints.value = await responseComparision.json();
        console.log(responseComparision);

        isLoading.value = false;
    } catch (err: any) {
        error.value = err.message;
        isLoading.value = false;
    }
};

onMounted(async () => {
    await fetchData();

    if (footprints.value != null && footprints.value.length > 0) {
        chartOptions.value = getData();
    }
});

const selectedData = computed(() => {
    return selectedFootprints.value.map((selectedFootprint) => {
        const footprint = footprints.value.find(
            (f) => f.name === selectedFootprint
        );
        return footprint.values.map((valueObj: any) => ({
            category: valueObj.category,
            value: valueObj.value,
        }));
    });
});

const selectedCategories = computed(() => {
    return selectedFootprints.value.map((selectedFootprint) => {
        const footprint = footprints.value.find(
            (f) => f.name === selectedFootprint
        );
        return footprint.value.name;
    });
});

let available_Categories = computed(() => {
    return footprints.value[0]?.values.map(
        (valueObj: any) => valueObj.category
    );
});

function getData() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            data: available_Categories,
        },
        textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: selectedCategories,
            //selectedData[0].map((data) => data.category), // Use the categories from the first selectedData array
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
        },
        series: available_Categories.value.map((data: any, index: any) => ({
            name: data,
            type: 'bar',
            // markline
            markLine: {
                label: {
                    show: true,
                    position: 'insideStart', //["10%","10%"], //"insideLeft", //'end',
                    formatter: 'Ziel 2030:\n4,1 Tonnen\n\n\n', // Change this to your desired text
                },
                lineStyle: {
                    width: 3,
                    type: 'solid', // You can change the line style if needed
                    color: 'gray', // You can change the line color
                },
                symbol: 'none',
                data: [
                    { yAxis: 4.1 }, // Change the yAxis value to set the position of the line
                ],
            },
            //
            stack: 'stack',
            barWidth: '60%',
            data: selectedData.value.map(
                (selectedData) => selectedData[index].value
            ),
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}t CO2',
            },
        })),
    };
}
</script>

<style scoped></style>
