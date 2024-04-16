<template>
    <div class="min-page-height d-flex align-center justify-center">
        <v-card width="100%" elevation="0">
            <v-tabs
                v-model="tab"
                align-tabs="center"
                color="primary-darken-1"
                :fixed-tabs="true"
            >
                <v-tab value="map" prepend-icon="mdi-map">
                    Karten Diagramm
                </v-tab>
                <v-tab value="charts" prepend-icon="mdi-chart-bar">
                    Durchschnitt
                </v-tab>
                <v-tab value="groups" prepend-icon="mdi-account-group-outline">
                    Gruppen Diagramm
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
    </div>
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

<style scoped>
.min-page-height {
    min-height: calc(100vh - 100px);
}
</style>
