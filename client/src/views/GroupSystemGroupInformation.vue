<template>
    <v-container justify="center">
        <v-row v-if="error">
            <v-col>
                <v-alert icon="mdi-alert" type="error">
                    {{ error }}
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

                <v-btn
                    variant="tonal"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-chevron-right"
                    size="large"
                    to="/gruppensystem/neue-gruppe"
                >
                    Neue Gruppe erstellen
                </v-btn>
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

    <v-list>
        <v-list-item v-for="(group, index) in groups" :key="group.groupcode">
            <template v-slot:prepend>
                <v-avatar color="primary-darken-1" variant="tonal">
                    {{ index + 1 }}
                </v-avatar>
            </template>
            {{ group.groupname }}
            <template v-slot:append>
                <v-btn
                    variant="plain"
                    :rounded="true"
                    color="primary-darken-1"
                    append-icon="mdi-link"
                    @click="handleGroupClick(group.groupcode, group.groupname)"
                >
                    Links & QR-Code zur Gruppe
                </v-btn>

                <v-divider :vertical="true" class="mx-4" />

                <v-btn
                    variant="tonal"
                    color="error"
                    icon="mdi-delete"
                    @click="deleteGroup(group.groupcode)"
                />
            </template>
        </v-list-item>
    </v-list>

    <GroupSuccessful
        v-if="showGroupSuccess"
        :groupCode="groupCode"
        :groupName="groupName"
    />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Group } from '@/types/Group';
import GroupSuccessful from '@/components/GroupSystem/GroupSuccessful.vue';

let groups = ref<Array<Group>>([]);
let groupName = ref('');
let groupCode = ref('');
let showGroupSuccess = ref(false);
let error = ref<string | null>(null);

onMounted(async () => {
    try {
        const response = await fetch('/api/groups/member', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                co2token: `${localStorage.getItem('CO2Token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        groups.value = data as Array<Group>;
    } catch (fetchError) {
        console.error('Request failed: ', fetchError);
    }
});

const handleGroupClick = (groupCodeVal: string, groupNameVal: string) => {
    groupCode.value = groupCodeVal;
    groupName.value = groupNameVal;
    showGroupSuccess.value = !showGroupSuccess.value;
};

const deleteGroup = async (groupCodeVal: string) => {
    try {
        const response = await fetch('/api/groups/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                co2token: `${localStorage.getItem('CO2Token')}`,
            },
            body: JSON.stringify({
                groupcode: groupCodeVal,
            }),
        });

        if (!response.ok) {
            error.value = 'Failed to delete group. Please try again later.';
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response is a valid JSON
        let data;
        if (
            response.headers.get('content-type')?.includes('application/json')
        ) {
            data = await response.json();

            if (data.error) {
                console.error('Group deletion error: ', data.error);
                return;
            }
        } else {
            data = await response.text();
        }

        // Filter out deleted group from groups
        groups.value = groups.value.filter(
            (group) => group.groupcode !== groupCodeVal
        );
    } catch (error) {
        console.error('Failed to delete group: ', error);
    }
};
</script>

<style scoped></style>
