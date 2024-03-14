<template>
    <v-container justify="center">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">
                    Sie haben Fragen oder wollen sich weiter informieren?
                </h1>
                <p class="text-secondary my-8">
                    Hier finden Sie weitere Infos rund um die CO2Runter
                    Webseite. Zusätzlich finden Sie hier unsere Quellen und
                    weitere Artikel. Stöbern Sie gerne auf den verlinkten
                    Seiten, um weitere Informationen rund um den Klimaschutz zu
                    erhalten.
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
        <v-row>
            <v-container style="padding-top: 7em">
                <h1 class="text-primary-darken-1 text-center">
                    Literaturliste
                </h1>
                <v-card>
                    <v-data-table :items="literatureSources"></v-data-table>
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
