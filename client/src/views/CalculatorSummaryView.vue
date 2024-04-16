<template>
    <v-container class="justify-center my-8">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col>
                <h1 class="text-primary-darken-1">Geschafft!</h1>
                <p>
                    Herzlichen Glückwunsch. Sie haben den CO2-Rechner
                    erfolgreich absolviert und ihr CO2-Wert konnte berechnet
                    werden.
                </p>
            </v-col>
            <v-col>
                <v-card
                    class="mx-auto ma-9 text-center"
                    max-width="400"
                    outlined
                >
                    <v-card-title>
                        Ihr berechneter CO2-Wert beträgt:
                    </v-card-title>
                    <v-card-text
                        class="text-center text-primary-darken-1 text-h4 font-weight-bold"
                    >
                        {{ totalCo2EmissionStore.total }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1">Stadtteile</v-tab>
            <v-tab :value="2">Gruppen</v-tab>
        </v-tabs>

        <!-- Container für den Stadtteile Tab-->
        <v-container v-if="tab === 1" class="my-8">
            <p class="mb-4">
                Bitte wählen Sie den Stadtteil, in dem Sie ansässig sind.
            </p>
            <v-select
                :items="[
                    'Knielingen',
                    'Daxlanden',
                    'Innenstadt-West',
                    'Innenstadt-Ost',
                    'Südstadt',
                    'Palmbach',
                    'Grünwettersbach',
                    'Hohenwettersbach',
                    'Wolfartsweier',
                    'Rintheim',
                    'Neureut',
                    'Waldstadt',
                    'Stupferich',
                    'Durlach',
                    'Grünwinkel,',
                    'Mühlbrug',
                    'Oberreut',
                    'Grötzingen',
                    'Hagsfeld',
                    'Weiherfeld-Dammerstock',
                    'Beiertheim-Bulach',
                    'Südweststadt',
                    'Weststadt',
                    'Nordweststadt',
                    'Nordstadt',
                    'Oststadt',
                    'Rüppurr',
                ]"
                label="Bitte wählen Sie einen Stadtteil"
                outlined
            ></v-select>
        </v-container>

        <!-- Container für den Gruppen Tab -->
        <v-container v-else-if="tab === 2">
            <p class="mt-4">
                Melden Sie sich an! So können Sie alle Gruppen sehen, in denen
                Sie Mitglied sind.
            </p>
            <v-tabs v-model="loginSelection" align-tabs="center" class="mt-8">
                <v-tab :value="1">ohne Login</v-tab>
                <v-tab :value="2">Login</v-tab>
            </v-tabs>

            <!-- Container für Gruppentabelle -->
            <v-container v-if="loginSelection === 1">
                <v-text-field
                    v-model="search"
                    class="mt-8"
                    hide-details
                    label="Suchen"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                ></v-text-field>
                <v-data-table :headers="headers" :search="search">
                </v-data-table>
            </v-container>

            <!-- Container für Loginform -->
            <v-container v-else-if="loginSelection === 2">
                <LoginForm />
            </v-container>
        </v-container>

        <!-- Buttons zum Absenden der Daten/ohne Absenden der Daten-->
        <v-col>
            <v-btn
                :rounded="true"
                append-icon="mdi-chevron-right"
                color="primary-darken-1"
                size="large"
                to="/"
                variant="tonal"
                >Daten abschicken
            </v-btn>
        </v-col>
        <v-col>
            <v-btn
                :rounded="true"
                append-icon="mdi-chevron-right"
                size="large"
                to="/"
                variant="tonal"
                >Weiter ohne Daten zu senden
            </v-btn>
        </v-col>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from '@/components/LoginRegistrationComponents/LoginForm.vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const tab = ref(1);
const loginSelection = ref(1);
const search = ref('');
const totalCo2EmissionStore = useTotalCo2EmissionStore();
const headers = [
    {
        title: 'Gruppenname',
        key: 'gruppenname',
    },
    {
        title: 'Gruppencode',
        key: 'gruppencode',
    },
    {
        title: 'Besitzer',
        key: 'besitzer',
    },
    {
        title: ':itgliederzahl',
        key: 'mitgliederzahl',
    },
];
</script>
<style scoped></style>
