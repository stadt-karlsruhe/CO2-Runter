<template>
    <v-container justify="center">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <!-- First Row -->
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">
                    Sie haben Fragen zum Klimaschutz oder zur Webseite??
                </h1>
                <p class="text-secondary my-8">
                    Hier finden Sie weitere Infos rund um die CO2Runter
                    Webseite. Zusätzlich finden Sie hier Antworten und
                    Erklärungen rund um das Thema Klimaschutz.
                </p>
            </v-col>
            <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_question_for_faq.svg"
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <!-- Second Row -->
            <h1 class="text-primary-darken-1 text-center">FAQ</h1>
            <v-expansion-panels variant="popout">
                <v-expansion-panel
                    title="Warum sollte ich das Klima schützen?"
                    text="Lorem ipsum..."
                    class="text-secondary"
                ></v-expansion-panel>
                <v-expansion-panel
                    title="Was ist der CO2 Fußabdruck und wieso ist er so wichtig?"
                    text="Lorem ipsum..."
                    class="text-secondary"
                ></v-expansion-panel>
                <v-expansion-panel
                    title="Wie kann ich den Klimaschutz in meinen Alltag integrieren?"
                    text="Lorem ipsum..."
                    class="text-secondary"
                ></v-expansion-panel>
                <v-expansion-panel
                    title="Wo kann ich mich weiter informieren?"
                    text="Lorem ipsum..."
                    class="text-secondary"
                ></v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <v-row style="padding-top: 7em">
            <!-- Third Row -->
            <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_up_to_date_re_nqid.svg"
                />
            </v-col>
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">
                    Sie möchten sich selbst ein wenig tiefer in den Klimaschutz
                    einlesen oder unsere Quellen sehen?
                </h1>
                <p class="text-secondary my-8">
                    Dann finden Sie hier unsere Literaturliste. Anbei sind alle
                    Informationen aufgelistet, die auf der CO2Runter Webseite
                    präsentiert werden. Zusätzlich sind weitere interessante
                    Artikel zum Thema Klimaschutz enthalten. Schauen Sie
                    unbedingt rein!
                </p>
            </v-col>
        </v-row>
        <v-row>
            <!-- Fourth Row -->
            <v-container>
                <h1 class="text-primary-darken-1 text-center">
                    Literaturliste
                </h1>
                <v-card>
                    <v-data-table :items="literatureSources"> </v-data-table>
                </v-card>
            </v-container>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
const literatureSources = [
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
    {
        titel: 'Test Titel eines Buches',
        autor: 'Test Name',
        jahr: 'Quelle des Textes/Internetseite',
        quelle: 2019,
    },
];
</script>
