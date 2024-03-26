<template>
    <v-sheet border>
        <v-card-title> Wie häufig fahren Sie mit dem Auto? </v-card-title>
        <v-select
            :items="['Nie', 'Selten', 'Normal', 'Häufig', 'Sehr häufig']"
            variant="outlined"
            rounded
            placeholder="Wählen Sie eine Option"
            class="ma-8"
        >
        </v-select>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        items: ['Nie', 'Selten', 'Normal', 'Häufig', 'Sehr Häufig'],
    }),
};
</script>

<style scoped>
*v-select {
    width: 70%;
}
</style>
