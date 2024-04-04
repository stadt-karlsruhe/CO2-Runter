<template>
    <v-container justify="center">
        <v-row v-if="error">
            <v-col>
                <v-alert v-if="error" icon="mdi-alert" type="error">
                    {{ error }}</v-alert
                >
            </v-col>
        </v-row>
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

                    <div class="d-flex justify-center align-center my-4">
                        <v-text-field
                            v-model="groupCode"
                            label="Gruppen-Code"
                            variant="outlined"
                        />

                        <v-btn
                            variant="tonal"
                            :rounded="true"
                            color="primary-darken-1"
                            append-icon="mdi-chevron-right"
                            size="large"
                            @click="joinGroup()"
                        >
                            Gruppe Hinzufügen
                        </v-btn>
                    </div>
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
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_community_re_cyrm.svg"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const groupCode = ref('');
const error = ref('');

// TODO: this is not working currently
const joinGroup = async () => {
    try {
        const response = await fetch('/api/groups/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                co2token: `${localStorage.getItem('CO2Token')}`,
            },
            body: JSON.stringify({
                groupcode: groupCode.value,
            }),
        });

        if (!response.ok) throw new Error(await response.text());
        error.value = '';

        groupCode.value = '';
    } catch (err) {
        error.value = 'Fehler beim Hinzufügen zur Gruppe, stellen sie sicher das sie eingeloggt sind und der Gruppen-Code korrekt ist.';
    }
};
</script>

<style scoped></style>
