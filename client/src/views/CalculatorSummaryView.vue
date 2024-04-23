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
                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    color="primary-darken-1"
                    :fixed-tabs="true"
                >
                    <v-tab value="district">Stadtteile</v-tab>
                    <v-tab value="group">Gruppen</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                    <v-window-item value="district">
                        <v-alert
                            v-if="isLoadingCityDistricts"
                            type="info"
                            variant="tonal"
                        >
                            Gruppen werden geladen...
                        </v-alert>

                        <v-alert
                            v-if="errorCityDistricts"
                            icon="mdi-alert"
                            type="error"
                            variant="tonal"
                        >
                            {{ errorCityDistricts }}
                        </v-alert>

                        <v-select
                            v-if="!isLoadingCityDistricts"
                            v-model="selectedCityDistricts"
                            :items="
                                cityDistricts.map((district) => district.name)
                            "
                            label="Bitte wählen Sie den Stadtteil, in dem Sie ansässig sind."
                            variant="outlined"
                            class="my-16"
                            @update:modelValue="updateSelectedCityDistrictId()"
                        />
                    </v-window-item>

                    <v-window-item value="group">
                        <div v-if="auth.isLoggedIn">
                            <v-alert
                                v-if="isLoadingGroups"
                                type="info"
                                variant="tonal"
                            >
                                Gruppen werden geladen...
                            </v-alert>

                            <v-alert
                                v-if="errorGroups"
                                icon="mdi-alert"
                                type="error"
                                variant="tonal"
                            >
                                {{ errorGroups }}
                            </v-alert>

                            <v-select
                                v-if="!isLoadingGroups"
                                v-model="selectedGroups"
                                :items="groups.map((group) => group.groupname)"
                                variant="outlined"
                                class="my-16"
                                label="Angezeigte Gruppen wählen"
                                :multiple="true"
                                @update:model-value="updateSelectedGroup()"
                            />
                        </div>

                        <div v-else>
                            <p class="mt-4">
                                Melden Sie sich an! So können Sie alle Gruppen
                                sehen, in denen Sie Mitglied sind.
                            </p>

                            <LoginForm />
                        </div>
                    </v-window-item>
                </v-window>
            </v-col>
        </v-row>
        <v-row class="my-16">
            <v-col>
                <v-btn
                    :rounded="true"
                    append-icon="mdi-chevron-right"
                    color="primary-darken-1"
                    size="large"
                    to="/"
                    variant="tonal"
                    @click="submitCo2EmissionsUpload()"
                    >Daten abschicken
                </v-btn>

                <v-btn
                    :rounded="true"
                    append-icon="mdi-chevron-right"
                    size="large"
                    to="/"
                    variant="tonal"
                    @click="continueWithoutUpload()"
                    >Weiter ohne Daten zu senden
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';
import { useRoute } from 'vue-router';
import { GroupData } from '@/types/Group';
import { CityDistrict } from '@/types/District';
import router from '@/router';
import useAuth from '@/composables/useAuth';
import LoginForm from '@/components/LoginRegistrationComponents/LoginForm.vue';

const {
    categories,
    updateDataSend,
    updateCategories,
    updateCo2ValuesPerCategory,
} = useTotalCo2EmissionStore();
const auth = useAuth();
const route = useRoute();
const selectedGroups = ref<string[]>([]);
const finalSelectedGroups = ref<string[]>([]);
const groups = ref<Array<GroupData>>([]);
const selectedCityDistricts = ref();
const selectedDistricts = ref();
const cityDistricts = ref<Array<CityDistrict>>([]);
const isLoadingGroups = ref(false);
const isLoadingCityDistricts = ref(false);
const errorGroups = ref('');
const errorCityDistricts = ref('');
const tab = ref('district');
const totalCo2EmissionStore = useTotalCo2EmissionStore();

const updateSelectedGroup = () => {
    finalSelectedGroups.value = groups.value
        .filter((group) => selectedGroups.value.includes(group.groupname))
        .map((group) => group.groupcode);
};

const updateSelectedCityDistrictId = () => {
    selectedDistricts.value = cityDistricts.value.find(
        (district) => district.name === selectedCityDistricts.value
    );
};

const submitCo2EmissionsUpload = async () => {
    try {
        const districtId = selectedDistricts.value
            ? selectedDistricts.value.district_ID
            : 0;

        const response = await fetch('/api/footprint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Insert Authentication headers if needed
            },
            body: JSON.stringify({
                groups: finalSelectedGroups.value,
                district: districtId,
                data: [
                    categories.mobility,
                    categories.housing,
                    categories.consume,
                    categories.nutrition
                ],
            }),
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        updateDataSend(true);
        router.push('/rechner/summary/submitted');
    } catch (error) {
        console.error(`Error submitting data: ${error}`);
    }
};

const continueWithoutUpload = () => {
    updateDataSend(false);
    router.push('/rechner/summary/submitted');
    // https://github.com/stadt-karlsruhe/CO2-Runter/blob/main/client/src/components/DistrictGroupChoice/ChoiceScreen.js
    // TODO: Properly implement that you save data for each category!
};

const fetchCityDistricts = async () => {
    isLoadingCityDistricts.value = true;
    try {
        const response = await fetch('/api/districts', {
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
        cityDistricts.value = data as Array<CityDistrict>;
    } catch (fetchError) {
        errorCityDistricts.value =
            'Probleme beim laden der Stadtteile. Bitte versuche es später erneut.';
    }
    isLoadingCityDistricts.value = false;
};

const fetchGroups = async () => {
    isLoadingGroups.value = true;
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
        errorGroups.value =
            'Probleme beim laden der Gruppen. Bitte versuche es später erneut.';
    }
    isLoadingGroups.value = false;
};

const checkUrlGroupCode = () => {
    if (route.query.groupcode) {
        const groupCodes = (route.query.groupcode as string).split(',');

        const groupMatches = groups.value
            .filter((group: GroupData) => groupCodes.includes(group.groupcode))
            .map((group: GroupData) => group.groupname);

        if (groupMatches.length > 0) {
            selectedGroups.value = groupMatches;
        }
    }
};

onMounted(async () => {
    await fetchGroups();
    await fetchCityDistricts();
    checkUrlGroupCode();
});
</script>
<style scoped></style>
