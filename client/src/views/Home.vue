<template>
    <v-container>
        <v-row align="center" :no-gutters="true" class="my-16">
            <v-col>
                <v-container>
                    <v-row align="center" :no-gutters="true">
                        <v-col cols="7">
                            <h1 class="text-primary-darken-1">
                                657,000,000 Tonnen
                            </h1>

                            <p class="text-secondary my-8">
                                CO2 werden jährlich allein von Deutschland
                                freigesetzt. Wie groß ist dein CO2-Fußabdruck?
                                Berechne ihn jetzt und entdecke, wie du einen
                                positiven Beitrag zum Klimaschutz leisten
                                kannst!
                            </p>

                            <v-btn
                                variant="tonal"
                                :rounded="true"
                                color="primary-darken-1"
                                append-icon="mdi-chevron-right"
                            >
                                Messen Sie ihren Co2-Fußabdruck
                            </v-btn>
                        </v-col>
                        <v-spacer />
                        <v-col>
                            <v-img
                                width="360px"
                                src="../assets/undraw_nature_m5ll.svg"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>

        <v-row align="center" :no-gutters="true" class="my-16">
            <v-col>
                <v-container>
                    <v-row align="center" :no-gutters="true">
                        <v-col>
                            <v-img
                                width="360px"
                                src="../assets/undraw_environment_iaus.svg"
                            />
                        </v-col>
                        <v-spacer />
                        <v-col cols="7">
                            <h1 class="text-primary-darken-1">Sie sind dran</h1>

                            <p class="text-secondary my-8">
                                sich zu engagieren und dafür zu sorgen diese
                                immense Zahl zu reduzieren. Berechnen Sie dafür
                                wie viel Sie verbrauchen oder schauen Sie direkt
                                was Sie tun können!
                            </p>

                            <v-btn
                                variant="tonal"
                                :rounded="true"
                                color="primary-darken-1"
                                append-icon="mdi-chevron-right"
                            >
                                Wie kann ich das Klima schützen
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>

        <v-row align="center" :no-gutters="true" class="my-16">
            <v-col>
                <v-container>
                    <v-row align="center" :no-gutters="true">
                        <v-col cols="7">
                            <h1 class="text-primary-darken-1">
                                CO2 Fußabdruck
                            </h1>

                            <p class="text-secondary my-8">
                                was ist das den überhaupt und was kann ich
                                darunter verstehen? Wenn dich das interessiert
                                dann Informier dich direkt hier bei uns.
                            </p>

                            <v-btn
                                variant="tonal"
                                :rounded="true"
                                color="primary-darken-1"
                                append-icon="mdi-chevron-right"
                            >
                                Mach dich schlau
                            </v-btn>
                        </v-col>
                        <v-spacer />
                        <v-col>
                            <v-img
                                width="360px"
                                src="../assets/undraw_waiting__for_you_ldha.svg"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup></script>
