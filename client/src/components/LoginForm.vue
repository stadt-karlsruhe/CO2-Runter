<template>
    <v-form @submit.prevent="handleSubmit">
        <v-alert v-if="error" type="error">
            {{ error }}
        </v-alert>
        <v-text-field
            label="Email"
            v-model="email"
            :rules="[
                (val) => emailRegex.test(val) || 'Ungültige E-Mail-Adresse',
            ]"
        />
        <v-text-field
            label="Passwort"
            type="password"
            v-model="password"
            :rules="[
                (val) =>
                    (val && val.length >= 4) ||
                    'Das Passwort muss mindestens 4 Zeichen lang sein',
            ]"
        />
        <v-btn variant="tonal" type="submit" :disabled="!isFormComplete()"
            >Anmelden</v-btn
        >
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const isEmailValid = () => email.value && emailRegex.test(email.value);
const isPasswordValid = () => password.value && password.value.length >= 4;
const isFormComplete = () => isEmailValid() && isPasswordValid();

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!isFormComplete()) return;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('CO2Token', data.token);
            await router.push('/destination'); // Replace with your destination route
        } else {
            error.value = 'Anmeldung fehlgeschlagen';
        }
    } catch (e) {
        error.value = 'Ein Serverfehler ist aufgetreten';
    }
};
</script>

<style scoped></style>
