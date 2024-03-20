<template>
    <v-form @submit.prevent="submitAccountRegistrationRequest">
        <v-alert v-if="error" type="error"> {{ error }}</v-alert>
        <v-text-field
            v-model="username"
            label="Benutzername"
            prepend-inner-icon="mdi-account"
            class="mb-4 mt-4"
            variant="outlined"
        />
        <v-text-field
            v-model="email"
            label="Email"
            :rules="[
                (v) => !!v || emailRegex.test(v) || 'E-mail must be valid',
            ]"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-4"
        />
        <v-text-field
            v-model="password"
            label="Passwort"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-4"
        >
        </v-text-field>
        <v-messages
            :value="[
                'Password must be at least 8 characters',
                'Must contain at least one number',
                'Must contain at least one special character',
            ]"
        />
        <v-text-field
            v-model="confirmPassword"
            label="Passwort bestätigen"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="[(v) => !!v || v === password || 'Passwords must match']"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            class="mb-4"
            variant="outlined"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
        />
        <v-btn
            color="primary-darken-1"
            variant="tonal"
            size="x-large"
            type="submit"
            :disabled="!isFormValid()"
            >Registrieren
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { JwtToken } from '@/types/JwtToken';
import useAuth from '@/composables/useAuth';

const { setCo2Token } = useAuth();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref<string | null>(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordLengthRegex = /^.{8,}$/; // At least 8 characters
const passwordNumberRegex = /\d+/; // At least one digit
const passwordSpecialCharRegex = /\W+/; // At least one non-word character (special character)

const passwordRules = computed(() => {
    return [
        (val: string) =>
            passwordLengthRegex.test(val) ||
            'Password must be at least 8 characters',
        (val: string) =>
            passwordNumberRegex.test(val) ||
            'Password must contain at least one number',
        (val: string) =>
            passwordSpecialCharRegex.test(val) ||
            'Password must contain at least one special character (like !, @, #, $, &, etc.)',
    ];
});

const isFormValid = () => {
    return (
        username.value &&
        emailRegex.test(email.value) &&
        passwordRules.value.every((rule) =>
            typeof rule === 'function' ? !!rule(password.value) : true
        ) &&
        password.value === confirmPassword.value
    );
};

const submitAccountRegistrationRequest = async () => {
    if (password.value !== confirmPassword.value) {
        error.value = 'Die Passwörter stimmen nicht überein';
        return;
    }

    try {
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

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    error.value =
                        'Fehlender Benutzername, E-Mail oder Passwort';
                    break;
                case 422:
                    error.value = 'Ungültige Eingabe';
                    break;
                case 409:
                    error.value =
                        'Die E-Mail oder der Benutzername ist bereits vergeben';
                    break;
                default:
                    error.value = 'Registrierung fehlgeschlagen';
            }
            return;
        }

        const data: JwtToken = await response.json();
        setCo2Token(data.token);
        location.reload();
        await router.push('/');
    } catch (e) {
        error.value = 'Ein Serverfehler ist aufgetreten';
    }
};
</script>

<style scoped></style>
