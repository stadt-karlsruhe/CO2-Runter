<template>
    <v-form @submit.prevent="submitAccountLoginRequest">
        <v-container justify="center">
            <v-row v-if="error">
                <v-col>
                    <v-alert icon="mdi-alert" type="error" variant="tonal">
                        {{ error }}
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        variant="outlined"
                        label="Email"
                        v-model="email"
                        type="email"
                        :rules="[
                            (val) =>
                                emailRegex.test(val) ||
                                'Ungültige E-Mail-Adresse',
                        ]"
                        prepend-inner-icon="mdi-email"
                        class="mb-4 mt-4"
                    />
                    <v-text-field
                        v-model="password"
                        variant="outlined"
                        label="Passwort"
                        :type="showPassword ? 'text' : 'password'"
                        prepend-inner-icon="mdi-lock"
                        class="mb-4"
                        :append-inner-icon="
                            showPassword ? 'mdi-eye-off' : 'mdi-eye'
                        "
                        @click:append-inner="showPassword = !showPassword"
                    />

                    <v-btn
                        color="primary-darken-1"
                        variant="tonal"
                        size="x-large"
                        type="submit"
                        :disabled="!isFormComplete()"
                        >Anmelden
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAuth from '@/composables/useAuth';
import router from '@/router';

const { login } = useAuth();
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const showPassword = ref(false);
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isEmailValid = () => email.value && emailRegex.test(email.value);
const isPasswordValid = () => password.value;
const isFormComplete = () => isEmailValid() && isPasswordValid();

const submitAccountLoginRequest = async (event: Event) => {
    event.preventDefault();

    if (!isFormComplete()) return;

    try {
        await login(email.value, password.value);

        await router.push('/');
    } catch (e: any) {
        error.value = e.message;
    }

    location.reload();
};
</script>

<style scoped></style>
