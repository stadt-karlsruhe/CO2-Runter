<template>
    <v-container>
        <v-row class="my-16">
            <v-col>
                <v-card elevation="0">
                    <v-tabs
                        v-model="tab"
                        align-tabs="center"
                        color="primary-darken-1"
                        :fixed-tabs="true"
                        :center-active="true"
                        :show-arrows="true"
                    >

                        <v-tab value="map" prepend-icon="mdi-map">
                            Karte
                        </v-tab>
                        <v-tab value="charts" prepend-icon="mdi-chart-bar">
                            Werte
                        </v-tab>
                        <v-tab
                            value="groups"
                            prepend-icon="mdi-account-group-outline"
                        >
                            Gruppen
                        </v-tab>
                        <v-tab
                            value="co2Footprint"
                            prepend-icon="mdi-chart-box-outline"
                        >
                            Beteiligungen
                        </v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="map">
                                <Co2MapsView />
                            </v-window-item>

                            <v-window-item value="charts">
                                <Co2ChartsView />
                            </v-window-item>

                            <v-window-item value="groups">
                                <Co2GroupsView />
                            </v-window-item>

                            <v-window-item value="co2Footprint">
                                <Co2TotalContribution />
                                <Co2PerDistrictContribution />
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Co2MapsView from '@/components/Dashboard/Co2MapsView.vue';
import Co2ChartsView from '@/components/Dashboard/Co2ChartsView.vue';
import Co2GroupsView from '@/components/Dashboard/Co2GroupsView.vue';
import Co2TotalContribution from '@/components/Dashboard/Co2TotalContribution.vue';
import Co2PerDistrictContribution from '@/components/Dashboard/Co2PerDistrictContribution.vue';

const tab = ref(null);
</script>

<style scoped></style>
