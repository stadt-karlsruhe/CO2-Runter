<template>
    <div>
        <v-card color="primary" elevation="0">
            <v-card-title>
                <h2>Gruppen Informationen</h2>
            </v-card-title>
            <v-card-text>
                <p>
                    Willkommen auf der Gruppenübersichtsseite! Hier finden Sie
                    eine praktische Zusammenfassung der Gruppen, in denen Sie
                    als Administrator tätig sind. Sie können hier jederzeit die
                    Links und QR-Codes abrufen, um sie mit Freunden, Familie,
                    Sportkollegen, Kollegen und anderen zu teilen.
                </p>
            </v-card-text>
        </v-card>

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
                        @click="
                            handleGroupClick(group.groupcode, group.groupname)
                        "
                    >
                        Links & QR-Code
                    </v-btn>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script setup lang="ts">
//TODO: IMPROVE DESIGN and fix  problem with not getting the groupcode properly

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
