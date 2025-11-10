<script setup>

import H1 from "../components/titles/H1.vue";
import Menu from "../components/menues/Menu.vue";
</script>

<template>
    <div class="flex flex-col w-full pl-8 pr-8 items-center">
        <Menu />
        <RouterView />
    </div>

</template>

<style scoped>

</style>
