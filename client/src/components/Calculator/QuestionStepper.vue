<template v-slot:default="{ prev, next }">
    <v-stepper
        v-model="step"
        :items="items"
        show-actions
        color="primary-darken-1"
    >
        <template v-slot:[`item.${1}`]>
            <h3 class="text-h6 text-center text-primary-darken-1">Mobilität</h3>

            <br />

            <!-- hier können die QuestionBlocks rein -->
        </template>

        <template v-slot:[`item.${2}`]>
            <h3 class="text-h6 text-center text-primary-darken-1">Ernährung</h3>

            <br />
        </template>

        <template v-slot:[`item.${3}`]>
            <h3 class="text-h6 text-center text-primary-darken-1">Wohnen</h3>

            <br />
        </template>

        <template v-slot:[`item.${4}`]>
            <h3 class="text-h6 text-center text-primary-darken-1">Konsum</h3>

            <br />
        </template>
    </v-stepper>
</template>

<script>
export default {
    data: () => ({
        shipping: 0,
        step: 1,
        items: ['Mobilität', 'Ernährung', 'Wohnen', 'Konsum'],
    }),
};
</script>

<style scoped></style>
