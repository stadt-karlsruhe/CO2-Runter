<template>
    <v-container justify="center">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">Das Gruppensystem</h1>

                <div class="my-8">
                    <h2 class="text-secondary my-4">
                        Zusammen CO2-Fußabdrücke erfassen
                    </h2>
                    <p>
                        Über das Gruppensystem auf dieser Webseite können Sie
                        gemeinsam mit anderen Nutzern CO2-Fußabdrücke erfassen.
                        So können Sie sich gegenseitig zu weiteren CO2
                        Einsparungen anregen.
                    </p>
                </div>

                <div class="my-8">
                    <h2 class="text-secondary my-4">Teilen ohne Anmeldung</h2>
                    <p>
                        Als eingeloggter Nutzer haben Sie die Möglichkeit,
                        Gruppen zu erstellen und den Link oder QR-Code an
                        Freunde, Familie, Sportkollegen, Kollegen und andere zu
                        verteilen.
                    </p>
                </div>

                <div class="my-8">
                    <h2 class="text-secondary my-4">
                        Schaffen Sie eine motivierende Umgebung
                    </h2>
                    <p>
                        Der Zweck des Gruppensystems besteht darin, eine
                        motivierende Umgebung zu schaffen, in der sich die
                        Teilnehmer gegenseitig inspirieren können,
                        CO2-Einsparungen zu erreichen...
                    </p>
                </div>

                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    to="/gruppensystem/neue-gruppe"
                    size="large"
                >
                    Erstelle jetzt eine neue Gruppe
                </v-btn>
            </v-col>
            <v-col class="d-flex align-center  justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_community_re_cyrm.svg"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
