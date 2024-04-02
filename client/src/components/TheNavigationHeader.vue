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
                    to="/rechner"
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
                    :exact="true"
                    title="Gruppensystem"
                    prepend-icon="mdi-account-group-outline"
                    class="mx-1 rounded-lg"
                    color="primary-darken-1"
                />

                <v-list-item
                    v-if="!isLoggedIn"
                    to="/login-registration"
                    :exact="true"
                    title="Login"
                    prepend-icon="mdi-login-variant"
                    class="rounded-lg mx-1 mr-3"
                    color="primary-darken-1"
                    :active="true"
                />

                <v-menu v-else :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            class="rounded-lg mx-1 mr-3"
                            color="primary-darken-1"
                            :active="true"
                        >
                            <template v-slot:prepend>
                                <v-icon>mdi-account</v-icon>
                            </template>

                            <v-list-item-title>Konto </v-list-item-title>

                            <template v-slot:append>
                                <v-icon>mdi-unfold-more-horizontal</v-icon>
                            </template>
                        </v-list-item>
                    </template>

                    <v-sheet rounded="lg" elevation="10" class="mt-2">
                        <v-list class="pa-4">
                            <v-list-subheader>Konto Aktionen </v-list-subheader>

                            <v-list-item
                                title="Gruppen Infos"
                                prepend-icon="mdi-information-outline"
                                class="mb-1 rounded-lg"
                                color="primary-darken-1"
                                to="/gruppensystem/gruppen-informationen"
                            />

                            <v-list-item
                                title="Logout"
                                prepend-icon="mdi-logout"
                                class="mb-1 rounded-lg"
                                color="primary-darken-1"
                                @click="logout()"
                            />
                        </v-list>
                    </v-sheet>
                </v-menu>
            </v-list>
        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="isDrawerOpen" class="hidden-md-and-up">
        <v-divider />

        <v-list class="pa-4">
            <v-list-subheader>Navigation</v-list-subheader>

            <v-list-item
                to="/rechner"
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
                :exact="true"
                title="Gruppensysten"
                prepend-icon="mdi-account-group-outline"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
            />

            <v-list-item
                v-if="!isLoggedIn"
                to="/login-registration"
                :exact="true"
                title="Login"
                prepend-icon="mdi-login-variant"
                class="mb-1 rounded-lg"
                color="primary-darken-1"
                :active="true"
            />

            <v-menu v-else :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        class="rounded-lg"
                        color="primary-darken-1"
                        :active="true"
                    >
                        <template v-slot:prepend>
                            <v-icon>mdi-account</v-icon>
                        </template>

                        <v-list-item-title>Konto </v-list-item-title>

                        <template v-slot:append>
                            <v-icon>mdi-unfold-more-horizontal</v-icon>
                        </template>
                    </v-list-item>
                </template>

                <v-sheet rounded="lg" elevation="10" class="mt-2">
                    <v-list class="pa-4">
                        <v-list-subheader>Konto Aktionen </v-list-subheader>

                        <v-list-item
                            title="Gruppen Infos"
                            prepend-icon="mdi-information-outline"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                            to="/gruppensystem/gruppen-informationen"
                        />

                        <v-list-item
                            title="Logout"
                            prepend-icon="mdi-logout"
                            class="mb-1 rounded-lg"
                            color="primary-darken-1"
                            @click="logout()"
                        />
                    </v-list>
                </v-sheet>
            </v-menu>
        </v-list>
    </v-navigation-drawer>

    <PWAInstallationDialog />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useAuth from '@/composables/useAuth';
import PWAInstallationDialog from '@/components/PWAInstallationDialog.vue';

// Use the composable
const { isLoggedIn, logout } = useAuth();

// Your remaining code stays the same
const isDrawerOpen = ref(false);

watch(isDrawerOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
});
</script>

<style scoped></style>
