<template>
    <v-card>
        <v-card-text v-if="isLoggedIn">
            <v-alert v-if="isLoading" type="info" variant="tonal">
                Daten werden geladen...
            </v-alert>

            <v-alert v-if="error" icon="mdi-alert" type="error" variant="tonal">
                {{ error }}
            </v-alert>

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
                variant="outlined"
                label="Angezeigte Gruppen wählen"
                @update:modelValue="updateChartOptions()"
                hint="Falls die Gruppe(n) keine Datenanzeigt, bedeutet das lediglich, dass die Gruppe(n) noch keinen CO2-Fußabdruck gesetzt hat."
                :persistent-hint="true"
            >
            </v-select>

            <v-card class="pa-4" variant="flat">
                <v-card-title>Du findest eine Gruppe nicht?</v-card-title>

                <v-card-text>
                    Wenn du nicht nicht die Gruppe siehst zu der du gehörst,
                    dann kannst du sie erneut hinzufügen, indem du zum
                    Gruppensystem gehst und dich erneut hinzufügst.
                </v-card-text>

                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="info"
                    append-icon="mdi-account-group-outline"
                    size="large"
                    to="/gruppensystem"
                >
                    Geh zum Gruppensystem
                </v-btn>
            </v-card>
        </v-card-text>
        <v-card-text v-else>
            <v-alert type="info" variant="tonal">
                Du bist nicht eingeloggt. Bitte logge dich ein, um die
                Gruppenübersicht zu sehen.
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
import useAuth from '@/composables/useAuth';
import { GroupData } from '@/types/Group';
import {
    AverageCo2Emissions,
    Co2ComparisonFootprints,
    GroupCo2FootprintEmissions,
} from '@/types/Co2Footprint';
import { useRoute } from 'vue-router';

use([BarChart, DatasetComponent, GridComponent, CanvasRenderer]);

const route = useRoute();
const { isLoggedIn } = useAuth();
const selectedGroups = ref<string[]>([]);
const isLoading = ref(true);
const averageData = ref<AverageCo2Emissions>([]);
const footprintsData = ref<Co2ComparisonFootprints>([]);
const error = ref('');
const groups = ref<Array<GroupData>>([]);
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
        groups.value = data as Array<GroupData>;
        // console.log(groups.value, 'here i havethe groups ith group codes');
        // await postData(groups.value);
    } catch (fetchError) {
        error.value =
            'Probleme beim laden der Gruppen. Bitte versuche es später erneut.';
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
                const data = ref<GroupCo2FootprintEmissions>(
                    await response.json()
                );
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

                // console.log(data.value, 'group data');

                if (data.value.values && data.value.values.length > 0) {
                    const groupExists = footprintsData.value.some(
                        (groupFootprint: any) =>
                            groupFootprint.name === data.value.name
                    );
                    if (!groupExists) {
                        footprintsData.value = [
                            ...footprintsData.value,
                            data.value,
                        ];
                    }
                }
            }
        }
    } catch (err) {
        error.value = 'Fehler beim Laden der Gruppen CO2-Fußabdrücke';
    } finally {
        isLoading.value = false;
    }
};

function getData() {
    // console.log(footprintsData.value);
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

const checkUrlGroupCode = () => {
    if (route.query.groupcode) {
        const groupCodes = (route.query.groupcode as string).split(',');

        const groupMatches = groups.value
            .filter((group: GroupData) => groupCodes.includes(group.groupcode))
            .map((group: GroupData) => group.groupname);

        if (groupMatches.length > 0) {
            console.log(groupMatches);
            selectedGroups.value = groupMatches;
            updateChartOptions();
        }
    }
};

onMounted(async () => {
    await fetchData();
    await fetchGroups();
    await fetchFootprintsForAllAvailableGroups();
    if (footprintsData.value != null && footprintsData.value.length > 0) {
        chartOptions.value = getData();
    }
    checkUrlGroupCode();
});
</script>

<style scoped></style>
