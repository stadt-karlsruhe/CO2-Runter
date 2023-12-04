<script setup lang="ts"></script>

<template>
    <v-app-bar rounded>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>CO2Runter </v-toolbar-title>

        <v-btn href="/">Home</v-btn>
        <v-btn href="/dashboard">Dashboard</v-btn>
        <v-btn href="/calculator">Calculator</v-btn>

        <v-spacer></v-spacer>

        <template v-slot:append>
            <v-btn icon="mdi-magnify"></v-btn>
            <v-btn icon="mdi-cog"></v-btn>
        </template>
    </v-app-bar>
</template>

<style scoped></style>
