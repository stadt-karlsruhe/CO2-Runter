<template>
    <v-container>
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">657 Millionen Tonnen</h1>
                <p class="text-secondary my-8">
                    CO<sub>2</sub> werden jährlich allein von Deutschland
                    freigesetzt. Möchten Sie herausfinden, wie groß Ihr
                    CO<sub>2</sub>-Fußabdruck ist? Berechnen Sie ihn in unter 5
                    Minuten und entdecken Sie, wie Sie einen positiven Beitrag
                    zum Klimaschutz leisten können!
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                    to="/rechner"
                >
                    Messen Sie ihren!
                </v-btn>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_nature_m5ll.svg"
                />
            </v-col>
        </v-row>

        <v-row class="d-flex flex-column flex-md-row my-16">
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
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
                    href="https://www.greenpeace.de/klimaschutz/klimakrise/10-tipps-klimaschutz-alltag"
                    target="_blank"
                >
                    Wie schützen Sie das Klima?
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">CO<sub>2</sub> Fußabdruck</h1>
                <p class="text-secondary my-8">
                    Was ist das denn überhaupt und was kann ich darunter
                    verstehen? Wenn dich das interessiert dann Informier dich
                    direkt über diesen Link.
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                    href="https://www.firstclimate.com/was-ist-ein-co2-fussabdruck"
                    target="_blank"
                >
                    Machen Sie sich schlau
                </v-btn>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
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
