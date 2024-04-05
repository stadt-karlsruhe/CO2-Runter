<template>
    <v-sheet border>
        <div
            v-for="(item, index) in questions.questions"
            :key="index"
            class="my-16 text-center"
        >
            <h3>{{ item.text }}</h3>
            <v-select
                :items="
                    props.questions.questions[index].replies.map(
                        (replies) => replies.text
                    )
                "
                :return-object="false"
                class="ma-16"
                placeholder="Wählen Sie eine Option"
                rounded
                variant="outlined"
            ></v-select>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
import { Category } from '@/types/Questionnaire';

const props = defineProps<{
    questions: Category;
}>();
</script>

<style scoped></style>
