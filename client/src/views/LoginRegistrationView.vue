<template>
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
                <v-tab value="registration" prepend-icon="mdi-account-details-outline">
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
