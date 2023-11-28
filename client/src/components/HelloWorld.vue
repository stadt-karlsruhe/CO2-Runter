<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
            <v-row class="d-flex align-center justify-center">
                <v-col cols="auto">
                    <v-btn
                        href="https://vuetifyjs.com/components/all/"
                        min-width="164"
                        rel="noopener noreferrer"
                        target="_blank"
                        variant="text"
                    >
                        <v-icon
                            icon="mdi-view-dashboard"
                            size="large"
                            :start="true"
                        />

                        Components
                    </v-btn>
                </v-col>

                <v-col cols="auto">
                    <v-btn
                        color="primary"
                        href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
                        min-width="228"
                        rel="noopener noreferrer"
                        size="x-large"
                        target="_blank"
                        variant="flat"
                    >
                        <v-icon
                            icon="mdi-speedometer"
                            size="large"
                            :start="true"
                        />

                        Get Started
                    </v-btn>
                </v-col>

                <v-col cols="auto">
                    <v-btn
                        href="https://community.vuetifyjs.com/"
                        min-width="164"
                        rel="noopener noreferrer"
                        target="_blank"
                        variant="text"
                    >
                        <v-icon
                            icon="mdi-account-group"
                            size="large"
                            :start="true"
                        />

                        Community
                    </v-btn>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script setup lang="ts">
//
</script>
