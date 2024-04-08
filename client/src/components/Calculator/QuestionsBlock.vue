<template>
    <div
        v-for="(item, index) in questions.questions"
        :key="index"
        class="my-16"
    >
        <h3 class="text-center">{{ item.text }}</h3>
        <v-select
            v-model="item.selected.text"
            :items="item.replies.map((replies) => replies.text)"
            :return-object="true"
            class="mt-16"
            placeholder="Wählen Sie eine Option"
            variant="outlined"
            @update:modelValue="test(index)"
        ></v-select>

        <v-alert type="info" variant="tonal" tex>
            <template #title> Titel für Tips und Tricks </template>
            <template #text>
                Beschriebung zu Tips und Tricks als auch eine Verlinkung die
                dann gemacht werden muss
            </template>
        </v-alert>
    </div>
</template>

<script lang="ts" setup>
import { Category, Replies } from '@/types/Questionnaire';
import useQuestions from '@/composables/useQuestions';

const props = defineProps<{
    categoryIndex: number;
    questions: Category;
}>();

const { updateSelectedValue } = useQuestions();

const test = (questionIndex: number) => {
    const array = props.questions.questions[questionIndex].replies;
    const textValue = props.questions.questions[questionIndex].selected.text;

    const object = findObjectInArray(array, textValue);
    updateSelectedValue(props.categoryIndex, questionIndex, object!);
};

function findObjectInArray(
    array: Replies[],
    textValue: string
): Replies | undefined {
    return array.find((item) => item.text === textValue);
}
</script>
<style scoped></style>
