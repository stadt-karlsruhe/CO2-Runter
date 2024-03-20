<template>
    <v-app>
        <v-container class="mt-5" v-if="groupCode && groupCode.groupcode">
            <GroupSuccesfull
                :group-code="groupCode.groupcode"
                :group-name="groupName"
            />
        </v-container>

        <v-container v-else justify="center">
            <v-row v-if="error">
                <v-col>
                    <v-alert icon="mdi-alert" type="error">
                        {{ error }}Alert
                    </v-alert>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column-reverse flex-md-row my-16">
                <v-col cols="12" md="7" class="text-center text-md-start">
                    <h1 class="text-primary-darken-1">
                        Eine neue Gruppe erstellen
                    </h1>

                    <div class="my-8">
                        <p>
                            Um eine neue Gruppe zu erstellen, müssen Sie
                            lediglich eine Gruppenname eingeben und auf "Gruppe
                            erstellen" klicken.
                        </p>
                    </div>

                    <v-text-field
                        prepend-inner-icon="mdi-account-group-outline"
                        v-model="groupName"
                        :clearable="true"
                        variant="outlined"
                        label="Gruppen Name"
                        :error-messages="error"
                        :disabled="isFetching"
                    ></v-text-field>

                    <v-btn
                        variant="tonal"
                        :rounded="true"
                        color="primary-darken-1"
                        append-icon="mdi-chevron-right"
                        size="large"
                        :disabled="isFetching || !groupName"
                        @click="CreateGroup()"
                    >
                        Gruppe erstellen
                    </v-btn>
                </v-col>
                <v-col
                    class="d-flex align-center justify-center"
                    cols="12"
                    md="5"
                >
                    <v-img
                        width="360px"
                        height="200px"
                        src="../assets/undraw_selecting_team_re_ndkb.svg"
                    />
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
