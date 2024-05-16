<template>
    <div
        v-for="(item, index) in questionStore.category[props.categoryIndex]
            .questions"
        :key="index"
        class="my-4"
    >
        <v-select
            v-model="item.selected"
            :items="item.replies"
            item-title="text"
            placeholder="Wählen Sie eine Option"
            :label="item.text"
            variant="outlined"
            :return-object="true"
            @update:modelValue="updateTotalEmissions()"
        >
            <!--            <template v-slot:item="{ props, item }">-->
            <!--                <v-list-item-->
            <!--                    v-bind="props"-->
            <!--                    :subtitle="item.value"-->
            <!--                ></v-list-item>-->
            <!--            </template>-->
        </v-select>
    </div>
</template>

<script lang="ts" setup>
import { useTotalCo2EmissionStore } from '@/store/totalCo2Emission';
import { useQuestionStore } from '@/store/useQuestionStore';

const props = defineProps<{
    categoryIndex: number;
}>();

const questionStore = useQuestionStore();
const totalCo2EmissionStore = useTotalCo2EmissionStore();

const updateTotalEmissions = () => {
    console.log(questionStore.category);
    console.log(totalCo2EmissionStore.calculateCo2ValuesPerCategory());
};
</script>

<style scoped></style>
