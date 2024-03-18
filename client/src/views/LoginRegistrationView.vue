<template>
    <div class="min-page-height d-flex align-center justify-center">
        <v-card width="100%" elevation="0">
            <v-tabs
                v-model="tab"
                align-tabs="center"
                slider-color="primary-darken-1"
                :fixed-tabs="true"
                :stacked="true"
            >
                <v-tab value="login">
                    <v-icon>mdi-login-variant</v-icon>
                    Login
                </v-tab>
                <v-tab value="registration">
                    <v-icon>mdi-account-details-outline</v-icon>
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
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import RegistrationForm from '../components/RegistrationForm.vue';

const tab = ref(null);
</script>

<style scoped>
.min-page-height {
    min-height: calc(100vh - 100px);
}
</style>
