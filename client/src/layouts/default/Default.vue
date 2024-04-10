<template>
    <v-locale-provider>
        <v-app>
            <TheNavigationHeader />
            <v-main>
                <v-divider />
                <v-container :fluid="true" class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
            <TheFooter />

            <ThePWAInstallationDialog v-model="dialogVisible" />
        </v-app>
    </v-locale-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TheNavigationHeader from '@/components/TheNavigationHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import ThePWAInstallationDialog from '@/components/ThePWAInstallationDialog.vue';

const dialogVisible = ref(false);
</script>

<style scoped>
.page-wrapper {
    padding: 24px;
    padding-bottom: 30px;

    @media screen and (max-width: 600px) {
        padding: 10px;
    }
}

.maxWidth {
    max-width: 1000px;
    margin: 0 auto;
}
</style>
