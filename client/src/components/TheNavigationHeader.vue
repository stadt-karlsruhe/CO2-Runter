<template>
    <v-app-bar rounded>
        <v-app-bar-nav-icon
            class="hidden-md-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
            @click.capture="isDrawerOpen = !isDrawerOpen"
        ></v-app-bar-nav-icon>

        <img
            src="../../public/CO2RunterLogo.ico"
            class="hidden-md-and-down ms-md-3 ms-sm-5 ms-3 text-muted"
        />
        <v-toolbar-title> CO2Runter </v-toolbar-title>

        <div class="hidden-sm-and-down">
            <v-btn rounded href="/">Home</v-btn>
            <v-btn rounded href="/calculator">CO2 Rechner</v-btn>
            <v-btn rounded href="/dashboard">Dashboard</v-btn>
            <v-btn rounded href="/info">Informationen</v-btn>
            <v-btn rounded href="/faq">FAQ</v-btn>

            <v-btn
                rounded
                color="primary-darken-1"
                variant="tonal"
                href="/gruppensystem"
                >Gruppensystem
            </v-btn>

            <v-btn
                rounded
                color="primary-darken-1"
                variant="tonal"
                href="/login"
                >Login
            </v-btn>
        </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="isDrawerOpen" class="hidden-md-and-up">
        <!-- Drawer content -->
        <v-list>
            <v-list-item link href="/">
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/calculator">
                <v-list-item-title>CO2 Rechner</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/dashboard">
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/info">
                <v-list-item-title>Informationen</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/faq">
                <v-list-item-title>FAQ</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/gruppensystem">
                <v-list-item-title>Gruppensystem</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/login">
                <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDrawerOpen = ref(false);
</script>

<style scoped></style>
