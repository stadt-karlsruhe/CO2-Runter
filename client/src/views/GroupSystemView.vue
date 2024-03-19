<template>
    <v-container justify="center">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">Das Gruppensystem</h1>
                <p class="text-secondary my-8">
                    Über das Gruppensystem auf dieser Webseite können Sie
                    gemeinsam mit anderen Nutzern CO2-Fußabdrücke erfassen. So
                    können Sie sich gegenseitig zu weiteren CO2 Einsparungen
                    anregen. Als eingeloggter Nutzer haben Sie die Möglichkeit,
                    Gruppen zu erstellen und den Link oder QR-Code an Freunde,
                    Familie, Sportkollegen, Kollegen und andere zu verteilen.
                    Mit diesem System können alle Teilnehmer ohne Anmeldung ihre
                    CO2-Fußabdrücke der Gruppe zuweisen. Der Zweck des
                    Gruppensystems besteht darin, eine motivierende Umgebung zu
                    schaffen, in der sich die Teilnehmer gegenseitig inspirieren
                    können, CO2-Einsparungen zu erreichen. Indem Sie ihre
                    Fortschritte innerhalb der Gruppe teilt, könnt ihr gemeinsam
                    Ziele setzen, Wettbewerbe veranstalten oder euch einfach
                    gegenseitig ermutigen, bewusste Entscheidungen zu treffen,
                    um eure CO2-Bilanz zu verbessern. Wir legen großen Wert auf
                    den Schutz Ihrer Daten. Innerhalb der Gruppe bleiben alle
                    Daten anonym, sodass Sie Ihre CO2-Fußabdrücke sicher teilen
                    können, ohne Ihre Privatsphäre zu gefährden. Ihre
                    Informationen werden vertraulich behandelt und nicht mit
                    anderen Gruppenmitgliedern geteilt. Nutzen Sie unser
                    benutzerfreundliches Gruppensystem, um Teil einer aktiven
                    Gemeinschaft zu werden, die gemeinsam daran arbeitet, den
                    CO2-Ausstoß zu verringern. Gemeinsam können wir einen
                    positiven Beitrag zum Umweltschutz leisten und uns
                    gegenseitig dazu inspirieren, nachhaltigere Lebensstile
                    anzunehmen.
                </p>
                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    to="/gruppensystem/neue-gruppe"
                >
                    Neue Gruppe erstellen
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
    </v-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
