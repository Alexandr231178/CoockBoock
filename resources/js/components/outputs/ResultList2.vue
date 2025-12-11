<script setup>
    import H1 from "../titles/H1.vue";
    import { useResultList } from "../../stores/resultList.js";
    import H2 from "../titles/H2.vue";

    const useStore = useResultList();

    const data = useStore.resultList2

</script>

<template>

    <H1>Названия столов:</H1>
    <div v-for="name in data[0]" class="text-left">
        <H2 class="mb-1.5">{{ name.name }}</H2>
    </div>

    <H1>Наименования блюд:</H1>
    <div v-for="name in data[1]" class="text-left">
        <H2 class="mb-1.5">{{ name.DishName }}</H2>
    </div>

<!--    <H1>Продукты - масса в граммах</H1>-->
<!--    <div v-for="product in data[4]">-->
<!--        <H2 class="mb-1.5">{{ product.productName }} - {{ product.resultQuantity}}</H2>-->
<!--    </div>-->
</template>

<style scoped>

</style>
