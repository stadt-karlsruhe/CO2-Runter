<template>
    <v-container
        style="min-height: 100vh; display: flex; flex-direction: column"
    >
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col class="text-center">
                <h1 class="text-primary-darken-1 text-center">
                    Fertig! Ihr Fußabdruck beträgt: {{ total }}t CO<sub>2</sub>
                </h1>

                <p class="my-8 text-left">
                    Die nachstehende Grafik zeigt die Verteilung Ihres
                    CO2-Fußabdrucks auf verschiedene Kategorien. Jede Kategorie
                    repräsentiert einen Bereich Ihres Lebens, der zur
                    Gesamtemission beiträgt, darunter Infrastruktur, Mobilität,
                    Ernährung, Wohnen und Konsum. Durch die Analyse dieser
                    Verteilung können Sie sehen, welche Aspekte Ihrer
                    Lebensweise den größten Einfluss auf Ihre
                    CO<sub>2</sub>-Emissionen haben und gegebenenfalls Maßnahmen
                    ergreifen, um diese zu reduzieren.
                </p>

                <v-alert
                    v-if="!dataSend"
                    type="error"
                    variant="tonal"
                    class="text-left"
                >
                    Schade das Sie ihre Daten nicht mit uns und den anderen
                    Nutzern teilen wollen.
                </v-alert>

                <v-chart
                    v-if="chartOptions"
                    :option="chartOptions!"
                    autoresize
                    :loadingOptions="loadingOptions"
                    style="height: 400px; width: 100%"
                />

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

const { categories, dataSend, total, base } = useTotalCo2EmissionStore();
const chartOptions = ref<any>(null);
const loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
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
                        value: base,
                        name: `Infrastruktur: ${base}`,
                    },
                    {
                        value: categories.mobility,
                        name: `Mobilität: ${categories.mobility.toFixed(2)}`,
                    },
                    {
                        value: categories.nutrition,
                        name: `Ernäherung: ${categories.nutrition.toFixed(2)}`,
                    },
                    {
                        value: categories.housing,
                        name: `Wohnen: ${categories.housing.toFixed(2)}`,
                    },
                    {
                        value: categories.consume,
                        name: `Konsum: ${categories.consume.toFixed(2)}`,
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
