<template>
    <v-container
        style="min-height: 100vh; display: flex; flex-direction: column"
    >
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col class="text-center">
                <h1 class="text-primary-darken-1">
                    Fertig! Dein Ergebnis wurde gespeichert.
                </h1>

                <v-btn
                    class="my-8"
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                    to="/"
                >
                    zurück zur Startseite
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
//TODO: https://github.com/stadt-karlsruhe/CO2-Runter/blob/main/client/src/components/DistrictGroupChoice/FinishScreen.js
</script>

<style scoped></style>
