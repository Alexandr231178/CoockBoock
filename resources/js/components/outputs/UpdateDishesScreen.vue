<script setup>
import H1 from "../titles/H1.vue";
import H2 from "../titles/H2.vue";
import {defineProps, ref, watch} from 'vue';

import { useDishComponents } from "../../stores/dishComponents.js";
import { useProducts } from "../../stores/products.js";

const useStoreProducts = useProducts();
const useStoreDishComponents = useDishComponents();

useStoreDishComponents.getAllDishComponents();
useStoreProducts.getAllProducts();

const props = defineProps({
    selectedId: {
        type: Number,
        default: null
    }
})

const dishComponentsList = ref(useStoreDishComponents.dishComponents);
let changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId);

watch(
    () => props.selectedId,
    () => {changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId)}
)





</script>

<template>
    <H1>Редактирование блюда</H1>
    <div v-for="product in changedDishComponents">
        <H2>{{product.dish_id }}</H2>
        <H2>{{ product.products_id }}</H2>
    </div>

</template>

<style scoped>

</style>
