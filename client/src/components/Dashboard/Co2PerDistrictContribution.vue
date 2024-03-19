<template>
    <div style="margin: 20px">
        <v-card style="width: 90%; margin-bottom: 10px; padding: 25px">
            <v-card-title>Beteiligung pro Stadtteil</v-card-title>
            <v-card-text style="height: 600px; width: 600px">
                <VChart
                    class="chart"
                    v-if="ready"
                    :options="chartOptions"
                    :loading="loading"
                    style="height: 100%; width: 100%"
                    autoresize
                />
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
    DatasetComponent,
    GridComponent,
    VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { BarSeriesOption } from 'echarts/charts';
import type {
    DatasetComponentOption,
    GridComponentOption,
    VisualMapComponentOption,
} from 'echarts/components';

use([
    DatasetComponent,
    GridComponent,
    VisualMapComponent,
    BarChart,
    CanvasRenderer,
]);

type EChartsOption = ComposeOption<
    | DatasetComponentOption
    | GridComponentOption
    | VisualMapComponentOption
    | BarSeriesOption
>;

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

const chartOptions = ref({});
const loading = ref(true);
const ready = ref(false);

interface FootprintDistrict {
    name: string;
    total: number;
}

const footprints_in_districts = ref<FootprintDistrict[]>([]);

onMounted(async () => {
    const { data, error } = await useFetch('/api/foodprint/districts').json();

    if (!error.value) {
        if (data.value) {
            footprints_in_districts.value = await data.value;

            // chartOptions.value = {
            //     tooltip: {
            //         trigger: 'axis',
            //         axisPointer: {
            //             type: 'shadow',
            //         },
            //     },
            //     yAxis: {
            //         type: 'category',
            //         data: footprints_in_districts.value.map((d) => d.name),
            //         axisLabel: {
            //             interval: 0,
            //             rotate: 45,
            //             width: 200,
            //             margin: 10,
            //             overflow: 'break',
            //         },
            //     },
            //     xAxis: {
            //         type: 'value',
            //     },
            //     series: [
            //         {
            //             name: 'Contributions',
            //             data: footprints_in_districts.value.map((d) => d.total),
            //             type: 'bar',
            //         },
            //     ],
            //     grid: {
            //         left: '1%',
            //         containLabel: true,
            //     },
            // };
            chartOptions.value = {
                dataset: {
                    source: [
                        ['score', 'amount', 'product'],
                        [89.3, 58212, 'Matcha Latte'],
                        [57.1, 78254, 'Milk Tea'],
                        [74.4, 41032, 'Cheese Cocoa'],
                        [50.1, 12755, 'Cheese Brownie'],
                        [89.7, 20145, 'Matcha Cocoa'],
                        [68.1, 79146, 'Tea'],
                        [19.6, 91852, 'Orange Juice'],
                        [10.6, 101852, 'Lemon Juice'],
                        [32.7, 20112, 'Walnut Brownie'],
                    ],
                },
                grid: { containLabel: true },
                xAxis: { name: 'amount' },
                yAxis: { type: 'category' },
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: 10,
                    max: 100,
                    text: ['High Score', 'Low Score'],
                    // Map the score column to color
                    dimension: 0,
                    inRange: {
                        color: ['#65B581', '#FFCE34', '#FD665F'],
                    },
                },
                series: [
                    {
                        type: 'bar',
                        encode: {
                            // Map the "amount" column to X axis.
                            x: 'amount',
                            // Map the "product" column to Y axis
                            y: 'product',
                        },
                    },
                ],
            };
        } else {
            console.warn(
                'Data from /api/foodprint/districts is null or undefined'
            );
        }
    } else {
        console.error('Error while fetching footprints_in_districts:', error);
    }

    // Chart has finished loading
    loading.value = false;
    ready.value = true;
});
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
