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
            @update:modelValue="UpdateEmissions(index)"
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
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';

const props = defineProps<{
    categoryIndex: number;
    questions: Category;
}>();

const { updateSelectedValue, calculateTotalCo2Emission } = useQuestions();
const totalCo2EmissionStore = useTotalCo2EmissionStore();

const UpdateEmissions = (questionIndex: number) => {
    const array = props.questions.questions[questionIndex].replies;
    const textValue = props.questions.questions[questionIndex].selected.text;

    const object = findObjectInArray(array, textValue);
    updateSelectedValue(props.categoryIndex, questionIndex, object!);

    totalCo2EmissionStore.calculateTotalCo2Emission(calculateTotalCo2Emission());
};

function findObjectInArray(
    array: Replies[],
    textValue: string
): Replies | undefined {
    return array.find((item) => item.text === textValue);
}
</script>
<style scoped></style>
