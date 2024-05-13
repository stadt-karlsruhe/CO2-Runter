<template>
    <v-stepper
        v-if="!showSummary"
        v-model="step"
        :alt-labels="true"
        elevation="0"
        class="ma-0 pa-0"
        :mobile="true"
    >
        <v-stepper-header style="box-shadow: none">
            <v-stepper-item title="Mobilität" value="1"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Ernährung" value="2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Wohnen" value="3"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Konsum" value="4"></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window class="ma-0 removeMargin">
            <v-stepper-window-item class="ma-0" value="1">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Mobilität</h1>
                            <p class="text-secondary my-8">
                                Mobilität spielt eine entscheidende Rolle in
                                unserem täglichen Leben und hat direkte
                                Auswirkungen auf unseren
                                CO<sub>2</sub>-Fußabdruck. Von der Wahl des
                                Verkehrsmittels bis hin zur Fahrzeugnutzung
                                beeinflussen unsere Entscheidungen maßgeblich
                                die Menge an CO<sub>2</sub>-Emissionen, die wir
                                verursachen. Indem du deine Mobilität bewusst
                                betrachtest und optimierst, kannst du nicht nur
                                deine Umweltbelastung verringern, sondern auch
                                einen positiven Beitrag zum Klimaschutz leisten.
                                Berechne jetzt deine Mobilitätsbilanz und
                                entdecke Möglichkeiten, wie du effizienter und
                                nachhaltiger unterwegs sein kannst!
                            </p>
                        </v-col>
                        <v-col
                            class="d-flex align-center justify-center"
                            cols="12"
                            md="5"
                        >
                            <v-img
                                width="360px"
                                height="200px"
                                src="../../assets/undraw_trip_re_f724.svg"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <QuestionsBlock
                                :category-index="QuestionsIndices.MOBILITY"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item class="ma-0" value="2">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Ernährung</h1>
                            <p class="text-secondary my-8">
                                Unsere Ernährungsgewohnheiten haben einen
                                direkten Einfluss auf unseren
                                CO<sub>2</sub>-Fußabdruck. Die Produktion, der
                                Transport und die Zubereitung von Lebensmitteln
                                tragen zur Freisetzung von Treibhausgasen bei.
                                Indem du deine Ernährungsgewohnheiten bewusst
                                hinterfragst und optimierst, kannst du nicht nur
                                deinen persönlichen CO<sub>2</sub>-Fußabdruck
                                reduzieren, sondern auch einen wichtigen Beitrag
                                zum Umweltschutz leisten. Berechne jetzt deinen
                                CO<sub>2</sub>-Fußabdruck durch Ernährung und
                                entdecke Möglichkeiten, wie du nachhaltiger
                                essen kannst!
                            </p>
                        </v-col>
                        <v-col
                            class="d-flex align-center justify-center"
                            cols="12"
                            md="5"
                        >
                            <v-img
                                width="360px"
                                height="200px"
                                src="../../assets/undraw_breakfast_psiw.svg"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <QuestionsBlock
                                :category-index="QuestionsIndices.NUTRITION"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item class="ma-0" value="3">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Wohnen</h1>
                            <p class="text-secondary my-8">
                                Unser Wohnverhalten trägt maßgeblich zur
                                Umweltbelastung bei. Von der Energieeffizienz
                                unserer Häuser bis zur Nutzung von Ressourcen
                                beeinflussen unsere Entscheidungen die Menge an
                                CO<sub>2</sub>-Emissionen, die wir verursachen.
                                Indem du dein Wohnverhalten überdenkst und
                                nachhaltige Maßnahmen ergreifst, kannst du nicht
                                nur deine Umweltbelastung verringern, sondern
                                auch einen wichtigen Beitrag zum Klimaschutz
                                leisten. Berechne jetzt deinen
                                CO<sub>2</sub>-Fußabdruck durch Wohnen und
                                entdecke Möglichkeiten, wie du dein Zuhause
                                nachhaltiger gestalten kannst!
                            </p>
                        </v-col>
                        <v-col
                            class="d-flex align-center justify-center"
                            cols="12"
                            md="5"
                        >
                            <v-img
                                width="360px"
                                height="200px"
                                src="../../assets/undraw_relaxing_at_home_re_mror.svg"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <QuestionsBlock
                                :category-index="QuestionsIndices.LIVING"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item class="ma-0" value="4">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Konsum</h1>
                            <p class="text-secondary my-8">
                                Unsere Konsumentscheidungen haben eine
                                erhebliche Auswirkung auf die Umwelt. Vom
                                Kaufverhalten bis zur Nutzung von Ressourcen
                                beeinflussen unsere Entscheidungen die Menge an
                                CO<sub>2</sub>-Emissionen, die wir verursachen.
                                Indem du deinen Konsum bewusst reflektierst und
                                nachhaltige Alternativen wählst, kannst du
                                deinen persönlichen CO<sub>2</sub>-Fußabdruck
                                reduzieren und einen positiven Einfluss auf die
                                Umwelt haben. Berechne jetzt deinen
                                CO<sub>2</sub>-Fußabdruck durch Konsum und
                                entdecke Möglichkeiten, wie du
                                umweltfreundlicher leben kannst!
                            </p>
                        </v-col>
                        <v-col
                            class="d-flex align-center justify-center"
                            cols="12"
                            md="5"
                        >
                            <v-img
                                width="360px"
                                height="200px"
                                src="../../assets/undraw_successful_purchase_re_mpig.svg"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <QuestionsBlock
                                :category-index="QuestionsIndices.CONSUM"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions>
            <template #prev>
                <v-btn @click="prev">zurück</v-btn>
            </template>

            <template #next>
                <v-btn v-if="step !== 3" @click="next">Weiter</v-btn>
                <v-btn
                    v-if="step === 3"
                    @click="showSummary = true"
                    :disabled="false"
                    >Ende
                </v-btn>
            </template>
        </v-stepper-actions>
    </v-stepper>

    <v-container v-else>
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col>
                <h1 class="text-primary-darken-1">Geschafft!</h1>
                <p>
                    Herzlichen Glückwunsch. Sie haben den CO<sub>2</sub>-Rechner
                    erfolgreich absolviert und ihr CO<sub>2</sub>-Wert konnte
                    berechnet werden.
                </p>
            </v-col>
        </v-row>

        <v-row>
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

                <v-window v-model="tab" class="ma-0 pa-0">
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
                            label="Bitte wählen Sie den Stadtteil aus."
                            variant="outlined"
                            class="my-4"
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
                                class="my-4"
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
        <v-row class="px-4 mb-4">
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

            <v-spacer />

            <v-btn
                :rounded="true"
                append-icon="mdi-chevron-right"
                size="large"
                to="/"
                variant="tonal"
                @click="continueWithoutUpload()"
                >Ohne Upload fortfahren
            </v-btn>
        </v-row>
        <v-row>
            <v-col>
                <v-alert type="info" variant="tonal"
                    >Die Daten werden sicher auf einem städtischen Server
                    hochgeladen und ausschließlich für die Anzeige
                    verwendet.</v-alert
                >
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import QuestionsBlock from '@/components/Calculator/QuestionsBlock.vue';
import { QuestionsIndices } from '@/constants/QuestionsIndices';
import router from '@/router';
import { useRoute } from 'vue-router';
import LoginForm from '@/components/LoginRegistrationComponents/LoginForm.vue';
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';
import useAuth from '@/composables/useAuth';
import { GroupData } from '@/types/Group';
import { CityDistrict } from '@/types/District';

const route = useRoute();
const step = ref(0);
const showSummary = ref(false);

const next = () => {
    if (step.value < 4) {
        step.value++;
    }
};

const prev = () => {
    if (step.value > 0) {
        step.value--;
    }
};

// Summary Information Details

const { categories, updateDataSend } = useTotalCo2EmissionStore();
const auth = useAuth();
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
                    categories.nutrition,
                ],
            }),
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        updateDataSend(true);
        router.push('/rechner/submitted');
    } catch (error) {
        console.error(`Error submitting data: ${error}`);
    }
};

const continueWithoutUpload = () => {
    updateDataSend(false);
    router.push('/rechner/submitted');
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
        if(auth.isLoggedIn.value){
            errorGroups.value =
                "Sie sind Angemeldet, aber es gibt Probleme beim laden der Stadtteile. Bitte loggen Sie sich aus und erneut ein."
        }else{
            errorGroups.value =
                "Die Gruppen konnten nicht geladen werden. Bitte versuche es später erneut oder Logen sie sich ein."
        }
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
