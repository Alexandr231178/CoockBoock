<script setup>
    import H1 from "../titles/H1.vue";
    import { useResultList } from "../../stores/resultList.js";
    import H2 from "../titles/H2.vue";

    const useStore = useResultList();
    const data = useStore.resultList
</script>

<template>
    <H1>Название стола: {{ data[0]}}</H1>
    <H2>Количество персон: {{ data[1]}}</H2>
    <H1>Наименования блюд:</H1>
    <div v-for="name in data[3]" class="text-left">
        <H2 class="mb-1.5">{{ name }}</H2>
    </div>
</template>

<style scoped>

</style>
