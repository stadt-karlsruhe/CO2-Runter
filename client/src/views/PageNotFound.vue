<template>
    <v-container style="min-height: 100vh; display: flex; flex-direction: column;">
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col class="d-flex align-center justify-center">
                <v-img
                    height="300px"
                    src="../assets/undraw_page_not_found_re_e9o6.svg"
                />
            </v-col>
        </v-row>

        <v-row class="d-flex flex-column-reverse flex-md-row my-16 ">
            <v-col class="text-center">
                <h1 class="text-primary-darken-1">Diese Seite konnte nicht gefunden werden</h1>

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
</script>

<style scoped></style>
