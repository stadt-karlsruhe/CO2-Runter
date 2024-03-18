<template>
    <v-form @submit.prevent="handleSubmit">
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-text-field v-model="username" label="Benutzername" />
        <v-text-field
            v-model="email"
            label="Email"
            :rules="[
                (v) => !!v || !emailRegex.test(v) || 'E-mail must be valid',
            ]"
        />
        <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            :rules="[
                (v) =>
                    !!v ||
                    v.length >= 4 ||
                    'Password must be at least 4 characters',
            ]"
        />
        <v-text-field
            v-model="confirmPassword"
            label="Passwort bestätigen"
            type="password"
            :rules="[(v) => !!v || v === password || 'Passwords must match']"
        />
        <v-btn variant="tonal" type="submit" :disabled="!isFormValid()"
            >Registrieren
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref<string | null>(null);

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isFormValid = () => {
    return (
        username.value &&
        emailRegex.test(email.value) &&
        password.value.length >= 4 &&
        password.value === confirmPassword.value
    );
};

const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
        error.value = 'Die Passwörter stimmen nicht überein';
        return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('CO2Token', data.token);
        await router.push('/');
    } else {
        error.value = 'An error occurred during registration';
    }
};
</script>

<style scoped></style>
