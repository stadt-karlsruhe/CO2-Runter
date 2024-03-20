<template>
    <v-form @submit.prevent="submitAccountLoginRequest">
        <v-alert v-if="error" type="error">
            {{ error }}
        </v-alert>
        <v-text-field
            variant="outlined"
            label="Email"
            v-model="email"
            :rules="[
                (val) => emailRegex.test(val) || 'Ungültige E-Mail-Adresse',
            ]"
            prepend-inner-icon="mdi-email"
            class="mb-4 mt-4"
        />
        <v-text-field
            variant="outlined"
            label="Passwort"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :rules="[
                (val) =>
                    (val && val.length >= 4) ||
                    'Das Passwort muss mindestens 4 Zeichen lang sein',
            ]"
            prepend-inner-icon="mdi-lock"
            class="mb-4"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
        >
        </v-text-field>
        <v-btn
            color="primary-darken-1"
            variant="tonal"
            size="x-large"
            type="submit"
            :disabled="!isFormComplete()"
            >Anmelden
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';

const { login } = useAuth();
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const showPassword = ref(false);
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isEmailValid = () => email.value && emailRegex.test(email.value);
const isPasswordValid = () => password.value && password.value.length >= 4;
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
