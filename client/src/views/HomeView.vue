<template>
    <v-container justify="center">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">657,000,000 Tonnen</h1>
                <p class="text-secondary my-8">
                    CO2 werden jährlich allein von Deutschland freigesetzt. Wie
                    groß ist dein CO2-Fußabdruck? Berechne ihn jetzt und
                    entdecke, wie du einen positiven Beitrag zum Klimaschutz
                    leisten kannst!
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                >
                    Messen Sie ihren Co2-Fußabdruck
                </v-btn>
            </v-col>
            <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_nature_m5ll.svg"
                />
            </v-col>
        </v-row>

        <!-- Second Row -->
        <v-row class="d-flex flex-column flex-md-row my-16">
            <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_environment_iaus.svg"
                />
            </v-col>
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">Sie sind dran</h1>
                <p class="text-secondary my-8">
                    Sich zu engagieren und dafür zu sorgen diese immense Zahl zu
                    reduzieren. Berechnen Sie dafür wie viel Sie verbrauchen
                    oder schauen Sie direkt was Sie tun können!
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                >
                    Wie kann ich das Klima schützen
                </v-btn>
            </v-col>
        </v-row>

        <!-- Third Row -->
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">CO2 Fußabdruck</h1>
                <p class="text-secondary my-8">
                    Was ist das denn überhaupt und was kann ich darunter
                    verstehen? Wenn dich das interessiert dann Informier dich
                    direkt hier bei uns.
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                >
                    Mach dich schlau
                </v-btn>
            </v-col>
            <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_waiting__for_you_ldha.svg"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup></script>

<style scoped></style>
