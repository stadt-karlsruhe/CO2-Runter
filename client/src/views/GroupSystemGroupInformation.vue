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
        <GroupSuccessful
            v-if="showGroupSuccess"
            :groupCode="groupCode"
            :groupName="groupName"
        />
        <div v-else>
            <p>Willkommen auf...</p>
            <ul>
                <li v-for="group in groups" :key="group.groupcode">
                    {{ group.groupname }}
                    <button
                        @click="
                            handleGroupClick(group.groupcode, group.groupname)
                        "
                    >
                        Links & QR-Code
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import { GroupCreatedResponse } from '@/types/GroupCreatedResponse';

interface Group {
    groupcode: string;
    groupname: string;
}

let groups = ref<Array<Group>>([]);
let groupName = ref('');
let groupCode = ref('');
let showGroupSuccess = ref(false);
let error = ref<string | null>(null);

let requestOptions = {
    method: 'POST',
    headers: new Headers(),
    body: JSON.stringify({
        co2token: localStorage.getItem('CO2Token'),
    }),
};

let {
    execute: fetchGroups,
    data,
    error: fetchError,
} = useFetch('/api/groups/member', requestOptions);

onMounted(async () => {
    await fetchGroups();
    if (fetchError.value) {
        error.value = fetchError.value;
    } else {
        groups.value = data.value as Group[];
    }
});

const handleGroupClick = (groupCodeVal: string, groupNameVal: string) => {
    groupCode.value = groupCodeVal;
    groupName.value = groupNameVal;
    showGroupSuccess.value = true;
};
</script>

<style scoped></style>
