<script setup>

import H2 from "../titles/H2.vue";

import { useDishesGroup } from "../../stores/dishesGroup.js";
import {onMounted, ref} from "vue";


const useStore = useDishesGroup();
useStore.getDishesGroup()
const dishesGroupList = ref(useStore.dishesGroup)

console.log(dishesGroupList);

</script>

<template>
    <div class="flex flex-col justify-between p-4 border rounded-2xl bg-white">
        <H2 class="mb-4">Группы блюд</H2>
        <div v-for="i in dishesGroupList" :key="i.id">
            <H2>{{ i.name }}</H2>
        </div>
    </div>
</template>

<style scoped>

</style>
