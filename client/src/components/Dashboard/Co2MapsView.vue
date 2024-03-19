<template>Karte</template>
<!--<template>-->
<!--    <v-chart-->
<!--        v-if="isFinished && !error"-->
<!--        ref="map"-->
<!--        :option="option"-->
<!--        autoresize-->
<!--        style="background-color: #404a59"-->
<!--    />-->
<!--    <div v-else-if="error">Daten werden geladen ...</div>-->
<!--    <div v-else>Error occurred!</div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { use, registerMap } from 'echarts/core';-->
<!--import { ScatterChart, EffectScatterChart } from 'echarts/charts';-->
<!--import {-->
<!--    GeoComponent,-->
<!--    TitleComponent,-->
<!--    LegendComponent,-->
<!--    TooltipComponent,-->
<!--} from 'echarts/components';-->

<!--import { useFetch } from '@vueuse/core';-->
<!--import geoJson from './districts_geo.json';-->
<!--import { shallowRef } from 'vue';-->

<!--use([-->
<!--    ScatterChart,-->
<!--    EffectScatterChart,-->
<!--    GeoComponent,-->
<!--    TitleComponent,-->
<!--    LegendComponent,-->
<!--    TooltipComponent,-->
<!--]);-->
<!--registerMap('Karlsruhe', geoJson);-->

<!--let selectedCategory = shallowRef('mobility');-->
<!--let categories = ['mobility', 'housing', 'consume', 'nutrition'];-->
<!--const { data, error, isFinished } = useFetch('/api/dashboard/footprints');-->
<!--let mapData = data ?? {};-->

<!--// Updating the option when the selected category changes:-->
<!--watch(selectedCategory, () => {-->
<!--    option.value = mapOption(selectedCategory.value);-->
<!--});-->

<!--// set up chart options-->
<!--const option = shallowRef({});-->

<!--let mapOption = (selectedCategory) => {-->
<!--    return {-->
<!--        title: {-->
<!--            text: 'CO2 Emissionen in Karlsruhe',-->
<!--            left: 'center',-->
<!--            padding: 10,-->
<!--        },-->
<!--        legend: {-->
<!--            top: 35,-->
<!--        },-->
<!--        tooltip: {-->
<!--            trigger: 'item',-->
<!--            formatter: function (params) {-->
<!--                var roundedValue = parseFloat(params.value).toFixed(2);-->
<!--                return params.name + '<br/>' + roundedValue + ' (kg CO2)';-->
<!--            },-->
<!--        },-->
<!--        visualMap: {-->
<!--            min: 0,-->
<!--            max: 20,-->
<!--            orient: 'horizontal',-->
<!--            left: 'center',-->
<!--            bottom: '5%',-->
<!--            inRange: {-->
<!--                color: [-->
<!--                    '#313695',-->
<!--                    '#4575b4',-->
<!--                    '#74add1',-->
<!--                    '#abd9e9',-->
<!--                    '#e0f3f8',-->
<!--                    '#ffffbf',-->
<!--                    '#fee090',-->
<!--                    '#fdae61',-->
<!--                    '#f46d43',-->
<!--                    '#d73027',-->
<!--                    '#a50026',-->
<!--                ],-->
<!--            },-->
<!--            text: ['High', 'Low'],-->
<!--            calculable: true,-->
<!--        },-->
<!--        roam: 'scale',-->
<!--        scaleLimit: {-->
<!--            min: 1,-->
<!--            max: 5,-->
<!--        },-->
<!--        series:-->
<!--            isFinished.value && !error.value-->
<!--                ? [-->
<!--                      {-->
<!--                          name: categories[0],-->
<!--                          type: 'map',-->
<!--                          map: 'Karlsruhe',-->
<!--                          showLegendSymbol: false,-->
<!--                          emphasis: {-->
<!--                              label: {-->
<!--                                  show: true,-->
<!--                              },-->
<!--                          },-->
<!--                          data: mapData.value[categories[0]],-->
<!--                      },-->
<!--                      {-->
<!--                          name: categories[1],-->
<!--                          type: 'map',-->
<!--                          map: 'Karlsruhe',-->
<!--                          showLegendSymbol: false,-->
<!--                          emphasis: {-->
<!--                              label: {-->
<!--                                  show: true,-->
<!--                              },-->
<!--                          },-->
<!--                          data: mapData.value[categories[1]],-->
<!--                      },-->
<!--                      // continue the same pattern for each category in categories-->
<!--                  ]-->
<!--                : [],-->
<!--    };-->
<!--};-->

<!--option.value = mapOption(selectedCategory.value);-->
<!--</script>-->
