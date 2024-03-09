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
        </v-app>
    </v-locale-provider>
</template>

<script lang="ts" setup>
import TheNavigationHeader from '@/components/TheNavigationHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style scoped>
.page-wrapper {
    min-height: calc(100vh - 100px);
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
