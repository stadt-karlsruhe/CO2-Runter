<template>
    <div>
        <v-card>
            <v-card-text>
                <v-chart
                    v-if="!loading"
                    :option="chartOptions"
                    autoresize
                    :loading="loading"
                    :loadingOptions="loadingOptions"
                    style="height: 600px; width: 100%"
                />
                <div v-else style="text-align: center">
                    Daten werden geladen ...
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import {
    GeoComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    VisualMapComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { registerMap } from 'echarts';
import geoJson from './districts_geo.json';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import { FootprintResponse } from '@/components/Dashboard/FootprintResponse';

use([
    ScatterChart,
    EffectScatterChart,
    GeoComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    CanvasRenderer,
    VisualMapComponent,
    MapChart,
]);

registerMap('Karlsruhe', geoJson as GeoJSONSourceInput);

const footprintsData = ref<FootprintResponse>();
const chartOptions = shallowRef();
let loading = ref(false);
let loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
};

const fetchFootprints = async () => {
    const response = await fetch('/api/dashboard/footprints');
    const data: FootprintResponse = await response.json();
    return data;
};

onMounted(async () => {
    loading.value = true;
    footprintsData.value = await fetchFootprints();
    chartOptions.value = getData();
    loading.value = false;
});
function getData() {
    return {
        title: {
            text: 'CO2 Emissionen in Karlsruhe',
            left: 'center',
            padding: 10,
        },
        legend: {
            top: 35,
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
                let roundedValue = parseFloat(params.value).toFixed(2);
                return params.name + '<br/>' + roundedValue + ' (kg CO2)';
            },
        },
        grid: {
            left: 'left',
        },
        visualMap: {
            min: 0,
            max: 20,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026',
                ],
            },
            text: ['High', 'Low'],
            calculable: true,
        },
        roam: 'scale',
        scaleLimit: {
            min: 1,
            max: 5,
        },
        series: loading.value
            ? [
                  {
                      name: 'Mobilität',
                      type: 'map',
                      map: 'Karlsruhe',
                      showLegendSymbol: false,
                      emphasis: {
                          label: {
                              show: true,
                          },
                      },
                      data: footprintsData.value!.mobility,
                  },
                  {
                      name: 'Ernährung',
                      type: 'map',
                      map: 'Karlsruhe',
                      showLegendSymbol: false,
                      emphasis: {
                          label: {
                              show: true,
                          },
                      },
                      data: footprintsData.value!.nutrition,
                  },
                  {
                      name: 'Konsum',
                      type: 'map',
                      map: 'Karlsruhe',
                      showLegendSymbol: false,
                      emphasis: {
                          label: {
                              show: true,
                          },
                      },
                      data: footprintsData.value!.consume,
                  },
                  {
                      name: 'Wohnen',
                      type: 'map',
                      map: 'Karlsruhe',
                      showLegendSymbol: false,
                      emphasis: {
                          label: {
                              show: true,
                          },
                      },
                      data: footprintsData.value!.housing,
                  },
              ]
            : [],
    };
}
</script>

<style scoped></style>
