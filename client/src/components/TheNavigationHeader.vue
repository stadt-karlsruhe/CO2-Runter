<template>
    <v-app-bar :elevation="0">
        <v-app-bar-nav-icon
            class="hidden-md-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
            @click.capture="isDrawerOpen = !isDrawerOpen"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
            <v-list class="d-flex">
                <v-list-item
                    to="/"
                    :exact="true"
                    title="CO2Runter"
                    class="rounded-lg"
                    prepend-avatar="../assets/co2runter-logo.png"
                    color="primary-darken-1"
                />
            </v-list>
        </v-toolbar-title>

        <div class="hidden-sm-and-down">
            <v-list class="d-flex">
                <v-list-item
                    to="/co2Rechner"
                    title="CO2 Rechner"
                    prepend-icon="mdi-calculator-variant-outline"
                    class="mx-1 rounded-lg"
                    color="primary-darken-1"
                />

                <v-list-item
                    to="/dashboard"
                    title="Dashboard"
                    prepend-icon="mdi-view-dashboard-outline"
                    class="mx-1 rounded-lg"
                    color="primary-darken-1"
                />

                <v-list-item
                    to="/faq"
                    title="FAQ"
                    prepend-icon="mdi-frequently-asked-questions"
                    class="mx-1 rounded-lg"
                    color="primary-darken-1"
                />

                <v-list-item
                    to="/gruppensystem"
                    title="Gruppensysten"
                    prepend-icon="mdi-account-group-outline"
                    class="mx-1 rounded-lg"
                    color="primary-darken-1"
                />

                <v-divider class="mx-4" :vertical="true" />

                <v-list-item
                    to="/login"
                    title="Login"
                    prepend-icon="mdi-login-variant"
                    class="mr-4 rounded-lg mr-1"
                    color="primary-darken-1"
                />
            </v-list>
        </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="isDrawerOpen"
        class="hidden-md-and-up"
        left
        app
    >
        <v-divider />

        <v-list class="pa-4">
            <v-list-subheader>Navigation</v-list-subheader>

            <v-list-item
                to="/co2Rechner"
                title="CO2 Rechner"
                prepend-icon="mdi-calculator-variant-outline"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />

            <v-list-item
                to="/dashboard"
                title="Dashboard"
                prepend-icon="mdi-view-dashboard-outline"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />

            <v-list-item
                to="/faq"
                title="FAQ"
                prepend-icon="mdi-frequently-asked-questions"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />

            <v-list-item
                to="/gruppensystem"
                title="Gruppensysten"
                prepend-icon="mdi-account-group-outline"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />

            <v-list-item
                to="/login"
                title="Login"
                prepend-icon="mdi-login-variant"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />
        </v-list>
    </v-navigation-drawer>

    <PWAInstallationDialog />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PWAInstallationDialog from '@/components/PWAInstallationDialog.vue';

const isDrawerOpen = ref(false);
</script>

<style scoped></style>
