<template>
    <v-card>
        <v-tabs
            v-model="tab"
            bg-color="primary"
            align-tabs="center"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import RegistrationForm from '../components/RegistrationForm.vue';

const tab = ref(null);
</script>

<style scoped></style>
