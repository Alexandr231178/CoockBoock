<script setup>
    import H1 from "../titles/H1.vue";
    import { useResultList } from "../../stores/resultList.js";

    const useStore = useResultList();
    const data = useStore.resultList
</script>

<template>
    <H1>{{ data[0]}}</H1>
    <H2>{{ data[1]}}</H2>
</template>

<style scoped>

</style>
