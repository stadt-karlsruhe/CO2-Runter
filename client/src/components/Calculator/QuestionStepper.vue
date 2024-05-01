<template>
    <v-stepper v-model="step" :alt-labels="true" elevation="0">
        <v-stepper-header style="box-shadow: none">
            <v-stepper-item title="Mobilität" value="1"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Ernährung" value="2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Wohnen" value="3"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Konsum" value="4"></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
            <v-stepper-window-item value="1">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Mobilität</h1>
                            <p class="text-secondary my-8">
                                CO2 werden jährlich allein von Deutschland
                                freigesetzt. Wie groß ist dein CO2-Fußabdruck?
                                Berechne ihn jetzt und entdecke, wie du einen
                                positiven Beitrag zum Klimaschutz leisten
                                kannst!
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
                                v-if="!isLoading"
                                :category-index="QuestionsIndices.MOBILITY"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Ernäherung</h1>
                            <p class="text-secondary my-8">
                                CO2 werden jährlich allein von Deutschland
                                freigesetzt. Wie groß ist dein CO2-Fußabdruck?
                                Berechne ihn jetzt und entdecke, wie du einen
                                positiven Beitrag zum Klimaschutz leisten
                                kannst!
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
                                v-if="!isLoading"
                                :category-index="QuestionsIndices.NUTRITION"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item value="3">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Wohnen</h1>
                            <p class="text-secondary my-8">
                                CO2 werden jährlich allein von Deutschland
                                freigesetzt. Wie groß ist dein CO2-Fußabdruck?
                                Berechne ihn jetzt und entdecke, wie du einen
                                positiven Beitrag zum Klimaschutz leisten
                                kannst!
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
                                v-if="!isLoading"
                                :category-index="QuestionsIndices.LIVING"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-stepper-window-item>

            <v-stepper-window-item value="4">
                <v-container>
                    <v-row class="my-16">
                        <v-col
                            cols="12"
                            md="7"
                            class="text-center text-md-start"
                        >
                            <h1 class="text-primary-darken-1">Konsum</h1>
                            <p class="text-secondary my-8">
                                CO2 werden jährlich allein von Deutschland
                                freigesetzt. Wie groß ist dein CO2-Fußabdruck?
                                Berechne ihn jetzt und entdecke, wie du einen
                                positiven Beitrag zum Klimaschutz leisten
                                kannst!
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
                                v-if="!isLoading"
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
                <v-btn v-if="step === 3" @click="ende()">Ende</v-btn>
            </template>
        </v-stepper-actions>
    </v-stepper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import QuestionsBlock from '@/components/Calculator/QuestionsBlock.vue';
import { QuestionsIndices } from '@/constants/QuestionsIndices';
import useQuestions from '@/composables/useQuestions';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const { fetchQuestions } = useQuestions();
const step = ref(0);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await fetchQuestions();
    isLoading.value = false;
});

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

const ende = () => {
    if (step.value == 3) {
        router.push({
            path: '/rechner/summary',
            query: { ...route.query },
        });
    }
};
</script>

<style scoped></style>
