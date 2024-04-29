<template>
    <div
        v-for="(item, index) in questionStore.category[props.categoryIndex].questions"
        :key="index"
        class="my-16"
    >
        <h3 class="text-center">{{ item.text }}</h3>

        <v-select
            v-model="item.selected"
            :items="item.replies"
            item-title="text"
            placeholder="Wählen Sie eine Option"
            variant="outlined"
            class="mt-16"
            :return-object="true"
            @update:modelValue="updateTotalEmissions(index)"
        >
            <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :subtitle="item.value"
                ></v-list-item>
            </template>
        </v-select>

        <!--        <v-alert type="info" variant="tonal" tex>-->
        <!--            <template #title> Titel für Tips und Tricks </template>-->
        <!--            <template #text>-->
        <!--                Beschriebung zu Tips und Tricks als auch eine Verlinkung die-->
        <!--                dann gemacht werden muss-->
        <!--            </template>-->
        <!--        </v-alert>-->
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

const updateTotalEmissions = (newVal: any) => {
    console.log(questionStore.category);
    console.log(totalCo2EmissionStore.calculateCo2ValuesPerCategory());
};
</script>

<style scoped></style>
