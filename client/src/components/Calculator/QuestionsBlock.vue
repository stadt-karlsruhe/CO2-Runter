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
import { ref } from 'vue';

const props = defineProps<{
    categoryIndex: number;
    questions: Category;
}>();

const { updateSelectedValue, getSelectedValuesPerCategory } = useQuestions();
const totalCo2EmissionStore = useTotalCo2EmissionStore();

const UpdateEmissions = (questionIndex: number) => {
    const array = props.questions.questions[questionIndex].replies;
    const textValue = props.questions.questions[questionIndex].selected.text;

    const object = findObjectInArray(array, textValue);
    updateSelectedValue(props.categoryIndex, questionIndex, object!);

    console.log(props.questions)
    if(props.questions.name === 'Mobilität') {
        let newValue = calculateEmissionBetter(props.questions);
        totalCo2EmissionStore.updateMobilityCategory(newValue);
    }
    if(props.questions.name === 'Ernäherung') {
        let newValue = calculateEmissionBetter(props.questions);
        totalCo2EmissionStore.updateNutritionCategory(newValue);
    }
    if(props.questions.name === 'Wohnen') {
        let newValue = calculateEmissionBetter(props.questions);
        totalCo2EmissionStore.updateLivingCategory(newValue);
    }
    if(props.questions.name === 'Konsum') {
        let newValue = calculateEmissionBetter(props.questions);
        totalCo2EmissionStore.updateConsumCategory(newValue);
    }

    console.log(totalCo2EmissionStore.categories)
    console.log(totalCo2EmissionStore.total)
};

function calculateEmissionBetter(category: Category) {
    const selectedValues = getSelectedValuesPerCategory(props.categoryIndex);

    const formula = stringToFunction(category.formula);
    const categoryValue = formula(selectedValues);

    return categoryValue
}

function stringToFunction(func: string) {
    const funcBody = func.substring(func.indexOf("{")+1, func.lastIndexOf("}"));
    return new Function('value', funcBody);
}

function findObjectInArray(
    array: Replies[],
    textValue: string
): Replies | undefined {
    return array.find((item) => item.text === textValue);
}
</script>
<style scoped></style>
