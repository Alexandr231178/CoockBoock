<script setup>
import { useProducts } from "../../stores/products.js";
import H2 from "../titles/H2.vue";
import {ref, watch} from "vue";
import Experiment from "./Experiment.vue";

const useStoreProducts2 = useProducts();

useStoreProducts2.getAllProducts();

const items = ref([]);
let changeDishProducts = ref([]);

watch(()=> useStoreProducts2.changeDishProducts,
    ()=>{
        changeDishProducts.value = useStoreProducts2.changeDishProducts;
    })


watch(() => useStoreProducts2.products, (newProducts) => {
    items.value = newProducts;
}, { immediate: true });


//Функция которая добавляет в стор добавленный продукт
function addedProductToStore(newProduct) {
    //console.log(newProduct);
    changeDishProducts.value.push(newProduct);
    console.log(changeDishProducts.value);
}

</script>

<template>
    <div class="p-4">
        <H2 class="">Окно добавления продукта</H2>
        <Experiment :items="items" @added-product="addedProductToStore"></Experiment>
    </div>

</template>

<style scoped>

</style>
