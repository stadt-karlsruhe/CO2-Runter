<template>
    <v-container v-if="showIfCameFromGruppenSystemPage" justify="center">
        <v-row>
            <v-col>
                <v-alert
                    title="Gruppen erstellen"
                    text="Um ihre eigene Gruppe zu erstellen müssen Sie sich entweder mit ihrem Account einloggen odersich kostenlos einen Account errstellen!"
                    type="info"
                ></v-alert>
            </v-col>
        </v-row>
    </v-container>

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

const previousRoutePath =
    window.sessionStorage.getItem('previousRoutePath') || null;

const showIfCameFromGruppenSystemPage = computed(
    () => previousRoutePath === '/gruppensystem'
);
</script>

<style scoped>
.min-page-height {
    min-height: calc(100vh - 100px);
}
</style>
