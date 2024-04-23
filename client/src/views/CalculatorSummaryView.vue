<template>
    <v-container>
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

        <v-row class="my-16">
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab :value="1">Stadtteile</v-tab>
                    <v-tab :value="2">Gruppen</v-tab>
                </v-tabs>

                <!-- Container für den Stadtteile Tab-->
                <div v-if="tab === 1" class="my-8">
                    <p class="mb-4">
                        Bitte wählen Sie den Stadtteil, in dem Sie ansässig
                        sind.
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
                </div>

                <!-- Container für den Gruppen Tab -->
                <div v-else-if="tab === 2">
                    <p class="mt-4">
                        Melden Sie sich an! So können Sie alle Gruppen sehen, in
                        denen Sie Mitglied sind.
                    </p>
                    <v-tabs
                        v-model="loginSelection"
                        align-tabs="center"
                        class="mt-8"
                    >
                        <v-tab :value="1">ohne Login</v-tab>
                        <v-tab :value="2">Login</v-tab>
                    </v-tabs>

                    <!-- Container für Gruppentabelle -->
                    <v-container v-if="loginSelection === 1">
<!--                        <v-text-field-->
<!--                            v-model="search"-->
<!--                            class="mt-8"-->
<!--                            hide-details-->
<!--                            label="Suchen"-->
<!--                            prepend-inner-icon="mdi-magnify"-->
<!--                            variant="outlined"-->
<!--                        ></v-text-field>-->
<!--                        <v-data-table :headers="headers" :search="search">-->
<!--                        </v-data-table>-->

                        <v-alert v-if="isLoading" type="info" variant="tonal">
                            Gruppen werden geladen...
                        </v-alert>

                        <v-alert v-if="error" icon="mdi-alert" type="error" variant="tonal">
                            {{ error }}
                        </v-alert>

                        <v-select
                            v-if="!isLoading"
                            v-model="selectedGroups"
                            :items="groups.map((group) => group.groupname)"
                            variant="outlined"
                            label="Angezeigte Gruppen wählen"
                            :multiple="true"
                        >
                        </v-select>
                    </v-container>

                    <!-- Container für Loginform -->
                    <v-container v-else-if="loginSelection === 2">
                        <LoginForm />
                    </v-container>
                </div>

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
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import LoginForm from '@/components/LoginRegistrationComponents/LoginForm.vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';
import { useRoute } from 'vue-router';
import { GroupData } from '@/types/Group';

const route = useRoute();
// TODO: multiple groups okey or not?
const selectedGroups = ref<string[]>([]);
const groups = ref<Array<GroupData>>([]);
const isLoading = ref(false);
const error = ref('');
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
        title: 'Mitgliederzahl',
        key: 'mitgliederzahl',
    },
];

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

const checkUrlGroupCode = () => {
    if (route.query.groupcode) {
        const groupCodes = (route.query.groupcode as string).split(',');

        const groupMatches = groups.value
            .filter((group: GroupData) => groupCodes.includes(group.groupcode))
            .map((group: GroupData) => group.groupname);

        if (groupMatches.length > 0) {
            console.log(groupMatches);
            selectedGroups.value = groupMatches;
        }
    }
};

onMounted(async () => {
    await fetchGroups();
    checkUrlGroupCode();
});
</script>
<style scoped></style>
