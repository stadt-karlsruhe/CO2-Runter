<template>
    <v-container justify="center">
        <v-row v-if="error">
            <v-col>
                <v-alert icon="mdi-alert" type="error">
                    {{ error }}Alert
                </v-alert>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-column-reverse flex-md-row my-16">
            <v-col cols="12" md="7" class="text-center text-md-start">
                <h1 class="text-primary-darken-1">Gruppen Informationen</h1>

                <div class="my-8">
                    <p>
                        Willkommen auf der Gruppenübersichtsseite! Hier finden
                        Sie eine praktische Zusammenfassung der Gruppen, in
                        denen Sie als Administrator tätig sind. Sie können hier
                        jederzeit die Links und QR-Codes abrufen, um sie mit
                        Freunden, Familie, Sportkollegen, Kollegen und anderen
                        zu teilen.
                    </p>
                </div>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="5">
                <v-img
                    width="360px"
                    height="200px"
                    src="../assets/undraw_community_re_cyrm.svg"
                />
            </v-col>
        </v-row>

    </v-container>

    <GroupSuccesfull
        v-if="showGroupSuccess"
        :groupCode="groupCode"
        :groupName="groupName"
    />

    <div v-else>
        <v-list>
            <v-list-item v-for="group in groups" :key="group.groupcode">
                {{ group.groupname }}
                <v-btn
                    @click="handleGroupClick(group.groupcode, group.groupname)"
                >
                    Links & QR-Code
                </v-btn>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup lang="ts">
//TODO: fix  problem with not getting the groupcode properly

import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import { Group } from '@/types/Group';
import GroupSuccesfull from '@/components/GroupSystem/GroupSuccesfull.vue';

let groups = ref<Array<Group>>([]);
let groupName = ref('');
let groupCode = ref('');
let showGroupSuccess = ref(false);
let error = ref<string | null>(null);

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('co2token', localStorage.getItem('CO2Token') || '');

const {
    execute,
    data,
    error: fetchError,
} = useFetch('/api/groups/member', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        co2token: `${localStorage.getItem('CO2Token')}`,
    },
}).json();

onMounted(async () => {
    await execute();

    if (fetchError.value) {
        error.value = fetchError.value;
    } else if (data.value) {
        groups.value = data.value as Group[];
    }
    console.log(fetchError);
    console.log(data);
});

const handleGroupClick = (groupCodeVal: string, groupNameVal: string) => {
    groupCode.value = groupCodeVal;
    groupName.value = groupNameVal;
    showGroupSuccess.value = true;
};
</script>

<style scoped></style>
