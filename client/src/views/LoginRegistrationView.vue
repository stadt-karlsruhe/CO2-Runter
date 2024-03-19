<template>
    <v-alert
        v-if="cameFromGruppenSystemPage"
        text="Um ihre eigene Gruppe zu erstellen müssen Sie sich entweder mit ihrem Account einloggen oder
            sich kostenlos einen Account errstellen!"
        title="Gruppen erstellen"
        type="info"
        variant="tonal"
    ></v-alert>

    <div class="min-page-height d-flex align-center justify-center">
        <v-card width="100%" elevation="0">
            <v-tabs
                v-model="tab"
                align-tabs="center"
                color="primary-darken-1"
                :fixed-tabs="true"
            >
                <v-tab value="login" prepend-icon="mdi-login-variant">
                    Login
                </v-tab>
                <v-tab
                    value="registration"
                    prepend-icon="mdi-account-details-outline"
                >
                    Registration
                </v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="login">
                        <LoginForm />
                    </v-window-item>

                    <v-window-item value="registration">
                        <RegistrationForm />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import LoginForm from '@/components/LoginRegistrationComponents/LoginForm.vue';
import RegistrationForm from '@/components/LoginRegistrationComponents/RegistrationForm.vue';

const tab = ref(null);

// get the previous path from sessionStorage
const previousRoutePath =
    window.sessionStorage.getItem('previousRoutePath') || null;

// check if the previous route is '/gruppensystem/neue-gruppe'
const cameFromGruppenSystemPage = computed(
    () => previousRoutePath === '/gruppensystem'
);
</script>

<style scoped>
.min-page-height {
    min-height: calc(100vh - 100px);
}
</style>
