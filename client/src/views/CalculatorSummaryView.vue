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
                    color=""
                    max-width="400"
                    outlined
                >
                    <v-card-title>
                        Ihr berechneter CO2-Wert beträgt:
                    </v-card-title>
                    <v-card-text
                        class="text-center text-primary-darken-1 text-h4 font-weight-bold"
                    >
                        180.000 kg
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-tabs align-tabs="center" v-model="tab">
            <v-tab :value="1">Stadtteile</v-tab>
            <v-tab :value="2">Gruppen</v-tab>
        </v-tabs>

        <!-- Container für den Stadtteile Tab-->
        <v-container class="my-8" v-if="tab === 1">
            <p class="mb-4">
                Bitte wählen Sie den Stadtteil, in dem Sie ansässig sind.
            </p>
            <v-select
                label="Bitte wählen Sie einen Stadtteil"
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
                outlined
            ></v-select>
        </v-container>

        <!-- Container für den Gruppen Tab -->
        <v-container v-else-if="tab === 2">
            Melden Sie sich an! So können Sie alle Gruppen sehen, in denen Sie
            Mitglied sind.
            <v-tabs class="mt-4" align-tabs="center" v-model="loginSelection">
                <v-tab :value="1">ohne Login</v-tab>
                <v-tab :value="2">Login</v-tab>
            </v-tabs>

            <!-- Container für Gruppentabelle -->
            <v-container v-if="loginSelection === 1">
                <!-- TODO: Tabelle mit möglichen Gruppen einfügen-->
            </v-container>

            <!-- Container für Loginform -->
            <v-container v-else-if="loginSelection === 2">
                <!-- TODO: Loginform einfügen -->
            </v-container>
        </v-container>

        <!-- Buttons zum Absenden der Daten/ohne Absenden der Daten-->
        <v-col>
            <v-btn
                variant="tonal"
                :rounded="true"
                color="primary-darken-1"
                append-icon="mdi-chevron-right"
                size="large"
                to="/rechner"
                >Daten abschicken
            </v-btn>
        </v-col>
        <v-col>
            <v-btn
                variant="tonal"
                :rounded="true"
                append-icon="mdi-chevron-right"
                size="large"
                to="/rechner"
                >Weiter ohne Daten zu senden
            </v-btn>
        </v-col>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref(1);
const loginSelection = ref(1);
const selectedOption = ref(null);
</script>

<style scoped></style>
