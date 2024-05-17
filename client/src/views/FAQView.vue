<template>
    <v-container>
        <v-row
            class="d-flex flex-column-reverse align-center flex-md-row my-16"
        >
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">
                    Sie haben Fragen zum Klimaschutz oder zur Webseite??
                </h1>
                <p class="text-secondary my-8">
                    Hier finden Sie weitere Infos rund um die
                    CO<sub>2</sub>Runter Webseite. Zusätzlich finden Sie hier
                    Antworten und Erklärungen rund um das Thema Klimaschutz.
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

        <v-row class="d-flex align-center justify-center flex-md-row my-16">
            <v-col>
                <h1 class="text-primary-darken-1 text-center mb-4">
                    Frequently Asked Questions
                </h1>

                <v-expansion-panels v-model="panel" variant="accordion">
                    <v-expansion-panel class="text-secondary" elevation="0">
                        <v-expansion-panel-title>
                            Was versteht man unter einem
                            CO<sub>2</sub>-Fußabdruck?
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <p class="text-secondary my-4">
                                Der CO<sub>2</sub>-Fußabdruck ist das Ergebnis
                                einer Emissionsberechnung beziehungsweise der
                                sogenannten CO<sub>2</sub>-Bilanz. Er gibt an,
                                welche Menge von Treibhausgasen durch eine
                                Aktivität, einen Prozess oder eine Handlung
                                freigesetzt wird. Ein CO<sub>2</sub>-Fußabdruck
                                lässt sich beispielsweise für Geschäfts- oder
                                Produktionsprozesse von Unternehmen angeben.
                            </p>
                            <p class="text-secondary my-4">
                                Auch Produkte haben einen
                                CO<sub>2</sub>-Fußabdruck, der die Summe der
                                Emissionen umfasst, die durch die Herstellung,
                                die Nutzung sowie die Verwertung und Entsorgung
                                des jeweiligen Produktes entstehen. Das gilt für
                                alle erdenklichen Artikel: vom Spielzeug, über
                                technische Geräte, bis hin zu Möbeln und
                                Einrichtungsgegenständen.
                            </p>
                            <p class="text-secondary my-4">
                                Ein CO<sub>2</sub>-Fußabdruck lässt sich darüber
                                hinaus aber auch für viele weitere Aktivitäten
                                und Prozesse berechnen – sowohl für Unternehmen
                                als auch für Privatpersonen. Zum Beispiel für
                                eine Veranstaltung, Hotelübernachtung, eine
                                Dienstreise per Auto, Bahn oder Flugzeug, oder
                                die Bereitstellung einer bestimmten
                                Dienstleistung.
                            </p>
                            <p class="text-secondary my-4">
                                Für Unternehmen, die sich im Bereich
                                Nachhaltigkeit engagieren, ist der
                                CO<sub>2</sub>-Fußabdruck ein wichtiges
                                Instrument zur Bewertung ihrer Klimawirkung und
                                damit zentraler Bestandteil der Ökobilanz und
                                der Nachhaltigkeitsberichterstattung.
                            </p>

                            <v-card variant="tonal">
                                <v-card-title>
                                    Faktoren des CO<sub>2</sub>-Fußabdrucks
                                </v-card-title>
                                <v-card-text>
                                    <v-list lines="three">
                                        <v-list-item>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Mobilität</v-list-item-title
                                            >
                                            <v-list-item-subtitle>
                                                Verkehrsmittel wie Autos,
                                                Flugzeuge und Züge verursachen
                                                unterschiedliche Mengen an
                                                CO<sub>2</sub>. Die Wahl des
                                                Verkehrsmittels und die
                                                Häufigkeit der Nutzung
                                                beeinflussen den
                                                CO<sub>2</sub>-Fußabdruck
                                                erheblich.
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Ernährung</v-list-item-title
                                            >
                                            <v-list-item-subtitle>
                                                Der Anbau, Transport und die
                                                Verarbeitung von Lebensmitteln
                                                tragen zur CO<sub>2</sub>-Bilanz
                                                bei. Besonders tierische
                                                Produkte haben oft einen höheren
                                                CO<sub>2</sub>-Fußabdruck als
                                                pflanzliche Lebensmittel.
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Konsum</v-list-item-title
                                            >
                                            <v-list-item-subtitle>
                                                Der Kauf und die Entsorgung von
                                                Konsumgütern beeinflussen den
                                                CO<sub>2</sub>-Ausstoß. Die
                                                Herstellung, Nutzung und
                                                Entsorgung von Produkten, von
                                                Spielzeug bis hin zu technischen
                                                Geräten und Möbeln, tragen zur
                                                CO<sub>2</sub>-Bilanz bei.
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Wohnung</v-list-item-title
                                            >
                                            <v-list-item-subtitle>
                                                Energieverbrauch für Heizung,
                                                Strom und Wasser in Haushalten
                                                trägt zum
                                                CO<sub>2</sub>-Fußabdruck bei.
                                                Die Art der Energiequelle und
                                                der Energieverbrauch
                                                beeinflussen die Höhe der
                                                Emissionen.
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Infrastruktur</v-list-item-title
                                            >
                                            <v-list-item-subtitle>
                                                Öffentliche Dienste und
                                                Infrastruktur wie Straßen,
                                                Brücken und öffentliche Gebäude
                                                haben ebenfalls einen
                                                CO<sub>2</sub>-Fußabdruck. Diese
                                                Emissionen werden oft durch
                                                staatliche und kommunale
                                                Projekte verursacht und
                                                beeinflussen die
                                                Gesamtemissionen einer Region.
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel class="text-secondary" elevation="0">
                        <v-expansion-panel-title>
                            Wie funktionert der CO<sub>2</sub> Rechner?
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Laut Energiebilanz Karlsruhe 2020 liegt der CO<sub
                                >2</sub
                            >
                            Ausstoß bei 7,4t jährlich pro Kopf. Die Effekte
                            durch privaten Konsum sind dabei nicht enthalten.
                            Addiert man hier den Grundwert (2,9t) gemäß unserer
                            Vereinfachung des UBA-Modells, dann erhält man 10,3t
                            CO<sub>2</sub>. Diese Grundwert-Summe bildet sich
                            aus 4 "Sektoren", die wir durch unseren Lebensstil
                            beeinflussen können, plus einer festen Zugabe für
                            öffentliche Infrastruktur. Im CO<sub>2</sub>-Rechner
                            können individuelle Angaben für die Sektoren Wohnen
                            (Heizung und Strom), Mobilität, Ernährung und
                            allgemeiner Konsum gemacht werden. Die
                            Auswahlmöglichkeiten und Berechnungsmodelle sind an
                            den CO<sub>2</sub>-Rechner des Umweltbundesamts
                            angelehnt. So lassen sich die Effekte zeigen, die
                            wir durch einen sparsamen oder weniger sparsamen
                            Lebensstil erzielen können. Eine exaktere Berechnung
                            ist ohne weitere Informationen über die persönliche
                            Situation im Einzelfall nicht möglich. Weitere
                            Informationen zum UBA-Modell und den
                            Einsparpotentialen finden sich in dieser
                            <a
                                href="https://www.umweltbundesamt.de/publikationen/klimaneutral-leben"
                                >Publikation</a
                            >
                            des UBA.
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel class="text-secondary" elevation="0">
                        <v-expansion-panel-title>
                            Wo kann ich die Ergebnisse vom CO<sub>2</sub>
                            Rechner einsehen?
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Persönliche Maßnahmen für den Klimaschutz werden
                            erfolgreicher, wenn wir auch andere Menschen von
                            ihnen überzeugen. Geben Sie Ihren Stadtteil an und
                            die Anzahl der Personen, die Sie dort als
                            Mitstreiterinnen und Mitstreiter gewinnen können und
                            nehmen Sie so an der Klima-Challenge teil. Die
                            aktuellen Ergebnisse sind auf unserem
                            <a href="/Dashboard">CO<sub>2</sub>-Dashboard</a>
                            sichtbar. Im Kanal "Grüne Stadt" der
                            <a
                                href="https://www.karlsruhe.de/stadt-rathaus/so-ist-karlsruhe/digital-smart/karlsruheapp"
                                >Karlsruhe-App</a
                            >
                            wird das Umweltamt das Projekt weiter verfolgen.
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col
                class="d-flex align-center justify-center my"
                cols="12"
                md="5"
            >
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
                    Informationen aufgelistet, die auf der CO<sub>2</sub>Runter
                    Webseite präsentiert werden. Zusätzlich sind weitere
                    interessante Artikel zum Thema Klimaschutz enthalten.
                    Schauen Sie unbedingt rein!
                </p>
            </v-col>
        </v-row>

        <v-row class="d-flex flex-md-row my-16">
            <v-col>
                <v-container>
                    <h1 class="text-primary-darken-1 text-center mb-4">
                        Literaturliste
                    </h1>

                    <v-text-field
                        v-model="search"
                        label="Suchen"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        hide-details
                    ></v-text-field>

                    <v-data-table
                        v-model:page="page"
                        :headers="headers"
                        :items="LiteratureSources"
                        :search="search"
                    >
                        <template v-slot:[`item.actions`]="props">
                            <v-btn
                                :href="props.item.url"
                                target="_blank"
                                icon="mdi-open-in-new"
                                elevation="0"
                                color="primary-darken-1"
                                variant="text"
                                size="small"
                            />
                        </template>
                        <template v-slot:bottom>
                            <div class="text-center pt-2">
                                <v-pagination
                                    v-model="page"
                                    :length="pageCount"
                                ></v-pagination>
                            </div>
                        </template>
                    </v-data-table>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LiteratureSources from '@/constants/LiteratureSources';

const route = useRoute();
const panel = ref(-1);
const search = ref('');
const page = ref(1);
const pageCount = Math.ceil(LiteratureSources.length / 10);

const headers = [
    {
        title: 'Titel',
        key: 'title',
    },
    {
        title: 'Author',
        key: 'author',
    },
    {
        title: 'Publisher',
        key: 'publisher',
        optional: true,
    },
    {
        title: 'Veröffentlichung',
        key: 'publicationYear',
    },
    {
        title: 'URL',
        key: 'url',
    },
    {
        title: '',
        key: 'actions',
        sortable: false,
    },
];

onMounted(() => {
    if (route.hash === '#co2-footprint') {
        panel.value = 0;
    }
});
</script>
