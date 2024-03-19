<template>
    <v-app>
        <v-container class="mt-5" v-if="groupCode">
            <GroupSuccesfull :group-code="groupCode" :group-name="groupName" />
            <v-btn color="primary" @click="$router.go(-1)">Zurück</v-btn>
        </v-container>

        <v-container v-else class="mt-5">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="groupName"
                        clearable
                        outlined
                        label="Gruppenname"
                        :disabled="isFetching"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-btn
                        :disabled="isFetching || !groupName"
                        @click="handleCreateGroup"
                    >
                        Gruppe erstellen
                    </v-btn>
                </v-col>
            </v-row>

            <v-row v-if="error">
                <v-col cols="12" sm="6" md="4">
                    <v-alert type="error">
                        {{ error }}
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import GroupSuccesfull from '@/components/GroupSystem/GroupSuccesfull.vue';
import { GroupCreatedResponse } from '@/types/GroupCreatedResponse';

let groupName = ref('');
let groupCode = ref<string | null | undefined>(null);
let error = ref<string | null>(null);

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', `Bearer ${localStorage.getItem('CO2Token')}`);

let requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        co2token: localStorage.getItem('CO2Token'),
        groupname: groupName.value,
    }),
};

let {
    isFetching,
    execute,
    data,
    error: fetchError,
} = useFetch<GroupCreatedResponse>('/api/groups/create', requestOptions);

let handleCreateGroup = async () => {
    await execute();
    if (fetchError.value) {
        error.value = 'A server error occurred.';
    } else {
        groupCode.value = data.value?.groupCode;
    }
};
</script>
