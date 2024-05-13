<template>
    <v-card>
        <v-card-text>
            <v-alert v-if="isLoading" type="info" variant="tonal" class="mb-4">
                Daten werden geladen...
            </v-alert>

            <v-alert
                v-if="error"
                icon="mdi-alert"
                type="error"
                variant="tonal"
                class="mb-4"
            >
                {{ error }}
            </v-alert>

            <div v-if="footprintsData.length > 0 && averageData.length > 0">
                <v-chart
                    v-if="chartOptions"
                    :option="chartOptions!"
                    autoresize
                    :loading="isLoading"
                    :loadingOptions="loadingOptions"
                    style="height: 600px; width: 100%"
                />

                <v-select
                    v-model="selectedFootprints"
                    :items="footprintsData.map((footprint) => footprint.name)"
                    :multiple="true"
                    variant="outlined"
                    label="Angezeigte Fußabdrücke wählen"
                    @update:modelValue="updateChartOptions()"
                />
            </div>

            <v-alert v-else icon="mdi-alert" type="error" variant="tonal">
                Es gibt keine Daten zum anzeigen.
            </v-alert>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import { onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {
    AverageCo2Emissions,
    Co2ComparisonFootprints,
} from '@/types/Co2Footprint';

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

const selectedFootprints = ref([]);
const isLoading = ref(true);
const averageData = ref<AverageCo2Emissions>([]);
const footprintsData = ref<Co2ComparisonFootprints>([]);
const error = ref('');
const chartOptions = ref<any>(null);
const loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
};

const updateChartOptions = () => {
    const data = getData();
    if (data) {
        chartOptions.value = data;
    }
};

const fetchData = async () => {
    isLoading.value = true;
    const average = await fetch('/api/dashboard/footprints/average');
    averageData.value = await average.json();
    const footprints = await fetch('/api/dashboard/comparisonprints');
    footprintsData.value = await footprints.json();
    isLoading.value = false;
};

function getData() {
    if (footprintsData.value.length === 0 || averageData.value.length === 0) {
        return null;
    }

    const selectedData = selectedFootprints.value.map((selectedFootprint) => {
        const footprint = footprintsData.value.find(
            (f) => f.name === selectedFootprint
        );
        return footprint!.values.map((valueObj) => ({
            category: valueObj.category,
            value: valueObj.value,
        }));
    });

    const selectedCategories = selectedFootprints.value.map(
        (selectedFootprint) => {
            const footprint = footprintsData.value.find(
                (f) => f.name === selectedFootprint
            );
            return footprint!.name;
        }
    );

    const available_Categories = footprintsData.value[0].values.map(
        (valueObj) => valueObj.category
    );

    // extras
    selectedData.push(
        averageData.value.map((valueObj) => ({
            category: valueObj.category,
            value: valueObj.value,
        }))
    );
    selectedCategories.push('Durchschnitt aller Beiträge');

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
        series: available_Categories.map((data: any, index: any) => ({
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
            data: selectedData.map(
                (selectedData: any) => selectedData[index].value
            ),
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}t CO2',
            },
        })),
    };
}

onMounted(async () => {
    await fetchData();

    if (footprintsData.value != null && footprintsData.value.length > 0) {
        chartOptions.value = getData();
    }
});
</script>

<style scoped></style>
