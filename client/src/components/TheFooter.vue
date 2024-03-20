<template>
    <v-divider />

    <div class="">
        <div class="d-flex justify-center align-center mt-16">
            <h1 class="text-primary-darken-1">Erstellt in Kollaboration</h1>
        </div>

        <v-container class="my-16">
            <v-row
                class="d-flex flex-column flex-md-row justify-center align-center"
                align-content="center"
                :no-gutters="true"
            >
                <v-col class="d-flex justify-center mb-3 mb-md-0">
                    <v-img
                        height="60px"
                        class="clickable-image"
                        src="../../public/images/Logos/Stadtkarlsruhe-logo.svg"
                        @click="navigate('https://www.karlsruhe.de/')"
                    />
                </v-col>
                <v-col class="d-flex justify-center mb-3 mb-md-0">
                    <v-img
                        height="120px"
                        class="clickable-image"
                        src="../../public/images/Logos/CodeFor-karlsruhe.svg"
                        @click="navigate('https://ok-lab-karlsruhe.de/')"
                    />
                </v-col>
                <v-col class="d-flex justify-center">
                    <v-img
                        height="60px"
                        class="clickable-image"
                        src="../../public/images/Logos/dhbw-logo.svg"
                        @click="
                            navigate(
                                'https://www.karlsruhe.dhbw.de/startseite.html'
                            )
                        "
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-divider />

        <v-container class="my-16">
            <v-row justify="center">
                <v-col cols="12" md="4" order-md="1">
                    <v-list class="d-flex">
                        <v-list-item
                            to="/"
                            :exact="true"
                            title="CO2Runter"
                            class="rounded-lg"
                            prepend-avatar="../../public/apple-touch-icon.png"
                            color="primary-darken-1"
                        />
                    </v-list>
                </v-col>
                <v-col cols="12" md="4" order-md="2">
                    <v-list class="pa-4">
                        <v-list-subheader
                            >Rechtliche Informationen
                        </v-list-subheader>

                        <v-list-item
                            href="https://www.karlsruhe.de/datenschutz"
                            title="Datenschutz"
                            prepend-icon="mdi-shield-account-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                        />

                        <v-list-item
                            href="https://www.karlsruhe.de/impressum"
                            title="Impressum"
                            prepend-icon="mdi-text-box-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                        />
                    </v-list>
                </v-col>
                <v-col cols="12" md="4" order-md="2">
                    <v-list class="pa-4">
                        <v-list-subheader
                            >Technische Informationen
                        </v-list-subheader>

                        <v-list-item
                            href="https://github.com/stadt-karlsruhe/CO2-Runter"
                            title="Quelltext"
                            prepend-icon="mdi-file-code-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                        />
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-footer
        class="text-center d-flex justify-center align-center"
        color="primary"
    >
        <div class="text-primary-darken-1">
            © 2023 - heute | CO2Runter. Alle Rechte vorbehalten.
        </div>
    </v-footer>
</template>

<script setup lang="ts">
const navigate = (link: string) => {
    window.open(link, '_blank');
};
</script>

<style scoped>
.clickable-image {
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
}

.clickable-image:hover {
    transform: scale(1.05);
}
</style>
