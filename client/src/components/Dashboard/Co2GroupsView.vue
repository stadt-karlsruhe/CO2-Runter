<template>
    <v-card>
        <v-card-title>Chart</v-card-title>
        <v-card-text v-if="isLoggedIn">
            <div v-if="isLoading">Daten werden geladen...</div>

            <div v-if="error">Es ist ein fehler aufgetreten: error</div>

            <v-chart
                v-if="chartOptions"
                :option="chartOptions!"
                autoresize
                :loading="isLoading"
                :loadingOptions="loadingOptions"
                style="height: 600px; width: 100%"
            />

            <v-select
                v-model="selectedGroups"
                :items="groups.map((group) => group.groupname)"
                :multiple="true"
                label="Angezeigte Gruppen wählen"
                @update:modelValue="updateChartOptions()"
            >
            </v-select>

            <p>
                Du willst einer Gruppe beitreten, dann geh zum Gruppensysten und
                tritt mit dem Code bei
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-account-group-outline"
                    size="large"
                    to="/gruppensystem"
                >
                    Geh zum Gruppensystem
                </v-btn>
            </p>
        </v-card-text>
        <v-card-text v-else>
            <p>
                Du bist nicht eingeloggt. Bitte logge dich ein, um die
                Gruppenübersicht zu sehen.
            </p>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {ComparisonPrints, DataType} from '@/types/ComparisonPrints';
import { AverageCo2Emissions } from '@/types/AverageCo2Emissions';
import { onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { Group } from '@/types/Group';
import useAuth from "@/composables/useAuth";

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

const selectedGroups = ref([]);
const isLoading = ref(true);
const averageData = ref<AverageCo2Emissions>([]);
const footprintsData = ref<ComparisonPrints>([]);
const error = ref('');
const { isLoggedIn } = useAuth();

const groups = ref<Array<Group>>([]);

const fetchGroups = async () => {
    isLoading.value = true;
    try {
        const response = await fetch('/api/groups/member', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                co2token: `${localStorage.getItem('CO2Token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        groups.value = data as Array<Group>;
        console.log(groups.value, 'here i havethe groups ith group codes');
        // await postData(groups.value);
    } catch (fetchError) {
        console.error('Request failed: ', fetchError);
    }
    isLoading.value = false;
};

const fetchData = async () => {
    isLoading.value = true;
    const average = await fetch('/api/dashboard/footprints/average');
    averageData.value = await average.json();
    const footprints = await fetch('/api/dashboard/comparisonprints');
    footprintsData.value = await footprints.json();
    isLoading.value = false;
};

const fetchFootprintsForAllAvailableGroups = async () => {
    isLoading.value = true;
    try {
        for (let i = 0; i < groups.value.length; i++) {
            const response = await fetch(
                `/api/dashboard/groupfootprint?groupcode=${groups.value[i].groupcode}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                const data = ref<DataType>(await response.json());
                // If values is empty array nothing has been set yet
                // This is what it would return if the group has not set their footprint yet
                // { name: 'groupname', values: [] }
                // if it is set it would be this
                // [
                //     {category: 'Mobilität', value: 1},
                //     {category: 'Wohnen', value: 1},
                //     {category: 'Konsum', value: 1},
                //     {category: 'Ernährung', value: 1},
                //     {category: 'Infrastruktur', value: 1}
                // ]

                // Give it some test data

                // TODO: remove this in the future when the co2 calculator works
                data.value = {
                    name: groups.value[i].groupname,
                    values: [
                        { category: 'Mobilität', value: 1 },
                        { category: 'Wohnen', value: 1 },
                        { category: 'Konsum', value: 1 },
                        { category: 'Ernährung', value: 1 },
                        { category: 'Infrastruktur', value: 1 },
                    ],
                };

                console.log(data.value, 'group data');

                if (data.value.values && data.value.values.length > 0) {
                    const groupExists = footprintsData.value.some(
                        (groupFootprint: any) =>
                            groupFootprint.name === data.value.name
                    );
                    if (!groupExists) {
                        footprintsData.value = [...footprintsData.value, data.value];
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    // TODO: add more with this maybe when it is in the params of the url
    const groupCode = localStorage.getItem('groupCode');
    await fetchData();
    await fetchGroups();
    await fetchFootprintsForAllAvailableGroups();
    if (footprintsData.value != null && footprintsData.value.length > 0) {
        chartOptions.value = getData();
    }
});

const updateChartOptions = () => {
    const data = getData();
    if (data) {
        chartOptions.value = data;
    }
};

const loadingOptions = {
    text: 'Loading…',
    color: '#4ea397',
    maskColor: 'rgba(255, 255, 255, 0.4)',
};

const chartOptions = ref<any>(null);

function getData() {
    console.log(footprintsData.value);
    if (footprintsData.value.length === 0 || averageData.value.length === 0) {
        return null;
    }

    const selectedData = selectedGroups.value.map((selectedGroup) => {
        const footprint = footprintsData.value.find(
            (f) => f.name === selectedGroup
        );
        return footprint!.values.map((valueObj) => ({
            category: valueObj.category,
            value: valueObj.value,
        }));
    });

    const selectedCategories = selectedGroups.value.map((selectedGroup) => {
        const footprint = footprintsData.value.find(
            (f) => f.name === selectedGroup
        );
        return footprint!.name;
    });

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
</script>

<style scoped></style>
