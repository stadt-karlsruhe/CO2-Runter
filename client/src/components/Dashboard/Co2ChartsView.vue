<template>Charts</template>
<!--<template>-->
<!--    <div v-if="isLoading" style="text-align: center;">Daten werden geladen ...-->
<!--    </div>-->
<!--    <div v-else-if="error" style="text-align: center;">Es ist ein Fehler-->
<!--        aufgetreten: {{ error }}-->
<!--    </div>-->
<!--    <div v-else>-->
<!--        <v-chart-->
<!--            v-if="footPrints && average && footPrints.length > 0 && average.length > 0"-->
<!--            :options="getOption()"-->
<!--            class="chart"-->
<!--            auto-resize />-->
<!--        <div v-else style="text-align: center;">Keine Daten verfügbar</div>-->
<!--        <v-select-->
<!--            :items="footPrintItems"-->
<!--            v-if="!isLoading && !error"-->
<!--            v-model="selectedFootprints"-->
<!--            label="Angezeigte Fußabdrücke wählen"-->
<!--            :multiple="true"-->
<!--            style="width: 250px; margin: auto;"-->
<!--        />-->
<!--    </div>-->
<!--</template>-->


<!--<script lang="ts" setup>-->
<!--import { ref, computed, onMounted } from 'vue';-->
<!--import { use } from 'echarts/core';-->
<!--import { BarChart } from 'echarts/charts';-->
<!--import {-->
<!--    TitleComponent, TooltipComponent, GridComponent, LegendComponent,-->
<!--} from 'echarts/components';-->
<!--import VChart from 'vue-echarts';-->
<!--import 'echarts/theme/dark';-->

<!--use([-->
<!--    BarChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent,-->
<!--]);-->

<!--let isLoading = ref(true);-->
<!--let error = ref(null);-->
<!--let footPrints = ref([]);-->
<!--let average = ref([]);-->
<!--let selectedFootprints = ref([]);-->

<!--const footPrintItems = computed(() => footPrints.value.map(fp => fp.name));-->

<!--const fetchData = async () => {-->
<!--    try {-->
<!--        const [averageResponse, footprintsResponse] = await Promise.all([-->
<!--            fetch('/api/dashboard/footprints/average'),-->
<!--            fetch('/api/dashboard/comparisonprints')-->
<!--        ]);-->

<!--        if (averageResponse.ok && footprintsResponse.ok) {-->
<!--            average.value = await averageResponse.json();-->
<!--            footPrints.value = await footprintsResponse.json();-->
<!--        } else {-->
<!--            console.log("Error Status: ", averageResponse.status, footprintsResponse.status);-->
<!--            throw new Error("Server response was not ok.");-->
<!--        }-->

<!--        isLoading.value = false;-->
<!--    } catch (err) {-->
<!--        error.value = err.message;-->
<!--        isLoading.value = false;-->
<!--    }-->
<!--};-->

<!--onMounted(fetchData);-->

<!--const getOption = () => ({-->
<!--    tooltip: {-->
<!--        trigger: 'axis',-->
<!--        axisPointer: {-->
<!--            type: 'shadow',-->
<!--        },-->
<!--    },-->
<!--    legend: {-->
<!--        data: ['Durchschnitt aller Beiträge', 'YourData1', 'YourData2'],-->
<!--        // Update these according to your needs-->
<!--    },-->
<!--    xAxis: {-->
<!--        data: ['Line1', 'Line2', 'Line3'],-->
<!--        // Update these according to your needs-->
<!--    },-->
<!--    yAxis: {},-->
<!--    series: [-->
<!--        {-->
<!--            name: 'Durchschnitt aller Beiträge',-->
<!--            type: 'bar',-->
<!--            data: average.value,-->
<!--            markLine: {-->
<!--                lineStyle: {-->
<!--                    type: 'dashed',-->
<!--                },-->
<!--                data: [[{-->
<!--                    type: 'min',-->
<!--                }, {-->
<!--                    type: 'max',-->
<!--                }]],-->
<!--            },-->
<!--        },-->
<!--        {-->
<!--            name: 'YourData1',-->
<!--            type: 'bar',-->
<!--            barGap: '-100%',-->
<!--            data: footPrints.value,-->
<!--            animation: false,-->
<!--        },-->
<!--        {-->
<!--            name: 'YourData2',-->
<!--            type: 'bar',-->
<!--            barGap: '-100%',-->
<!--            data: footPrints.value,-->
<!--            animation: false,-->
<!--        },-->
<!--    ],-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.chart {-->
<!--    height: 100vh;-->
<!--}-->
<!--</style>-->
