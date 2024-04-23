<template>
    <v-container
        style="min-height: 100vh; display: flex; flex-direction: column"
    >
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col class="text-center">
                <h1 class="text-primary-darken-1">
                    Ihr Aktueller Fußabdruck beträgt: {{ total }} t CO2
                </h1>
                <v-chart
                    v-if="chartOptions"
                    :option="chartOptions!"
                    autoresize
                    :loadingOptions="loadingOptions"
                    style="height: 400px; width: 100%"
                />
            </v-col>
        </v-row>

        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col class="text-center">
                <h1 class="text-primary-darken-1">
                    Fertig! Dein Ergebnis wurde gespeichert.
                </h1>

                <div v-if="!dataSend">
                    Schade das Sie ihre Daten nicht mit uns und den anderen
                    Nutzern teilen wollen.
                </div>

                <v-btn
                    class="my-8"
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                    to="/"
                >
                    zurück zur Startseite
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
    PolarComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref } from 'vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

use([
    PieChart,
    PolarComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    CanvasRenderer,
]);

const { categories, dataSend, total } = useTotalCo2EmissionStore();
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

function getData() {
    return {
        textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
            {
                name: 'Ihr Co2 Fußabdruck',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {
                        value: categories.mobility,
                        name: `Mobilität: ${categories.mobility}`,
                    },
                    {
                        value: categories.nutrition,
                        name: `Ernäherung: ${categories.nutrition}`,
                    },
                    {
                        value: categories.housing,
                        name: `Wohnen: ${categories.housing}`,
                    },
                    {
                        value: categories.consume,
                        name: `Konsum: ${categories.consume}`,
                    },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
}

onMounted(async () => {
    chartOptions.value = getData();
});
</script>

<style scoped></style>
