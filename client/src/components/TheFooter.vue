<template>
    <v-divider />

    <div class="maxWidth">
        <div class="d-flex justify-center align-center mt-16">
            <h1 class="text-primary-darken-1">Erstellt in Kollaboration</h1>
        </div>

        <v-container class="my-16">
            <v-row align-content="center" :no-gutters="true">
                <v-col>
                    <v-img
                        height="60px"
                        src="../../public/images/Logos/Stadtkarlsruhe-logo.svg"
                    />
                </v-col>
                <v-col>
                    <v-img
                        height="120px"
                        src="../../public/images/Logos/CodeFor-karlsruhe.svg"
                    />
                </v-col>
                <v-col>
                    <v-img
                        height="60px"
                        src="../../public/images/Logos/dhbw-logo.svg"
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-divider />

        <v-container class="my-16">
            <v-row align-content="center" :no-gutters="true">
                <v-col>
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
                <v-col>
                    <!--TODO: properly add the correct links here-->
                    <v-list class="pa-4">
                        <v-list-subheader>Informationen</v-list-subheader>

                        <v-list-item
                            href="/"
                            title="Datenschutz"
                            prepend-icon="mdi-shield-account-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                        />

                        <v-list-item
                            href="/"
                            title="Impressum"
                            prepend-icon="mdi-text-box-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                        />

                        <v-list-item
                            href="/"
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

<script setup lang="ts"></script>

<style scoped>
.maxWidth {
    max-width: 1000px;
    min-width: 480px;
    margin: 0 auto;
}
</style>
