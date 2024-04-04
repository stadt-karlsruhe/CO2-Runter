<template>
    <v-sheet border>
        <p v-for="(item, index) in questions.questions" :key="index">
            {{ item.name }}
        </p>
        <v-select
            v-model="props.questions.questions[0].quick.replies![0]"
            :label="props.questions.questions[0].quick.text"
            :items="props.questions.questions[0].quick.replies"
            variant="outlined"
            rounded
            placeholder="Wählen Sie eine Option"
            class="ma-8"
            :return-object="false"
        >
        </v-select>
    </v-sheet>
</template>

<script setup lang="ts">
import { Category } from '@/types/Questionnaire';

const props = defineProps<{
    questions: Category;
}>();
</script>

<style scoped></style>
