<template>
    <v-app>
        <v-container class="mt-5" v-if="groupCode && groupCode.groupcode">
            <GroupSuccesfull
                :group-code="groupCode.groupcode"
                :group-name="groupName"
            />
        </v-container>

        <v-container v-else class="mt-5">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="groupName"
                        :clearable="true"
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
                        @click="CreateGroup()"
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
//TODO: IMPROVE DESIGN

import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import GroupSuccesfull from '@/components/GroupSystem/GroupSuccesfull.vue';
import { GroupCreatedResponse } from '@/types/GroupCreatedResponse';

const groupName = ref('');
const groupCode = ref<GroupCreatedResponse>();
const error = ref<string | null>(null);

const {
    isFetching,
    execute,
    data,
    error: fetchError,
} = useFetch<GroupCreatedResponse>('/api/groups/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        co2token: localStorage.getItem('CO2Token'),
        groupname: groupName.value,
    }),
}).json();

const CreateGroup = async () => {
    await execute();

    if (fetchError.value) {
        error.value = 'A server error occurred.';
    } else if (data.value) {
        groupCode.value = data.value;
    }
};
</script>
