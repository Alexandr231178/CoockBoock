<script setup>

import H2 from "../titles/H2.vue";

import { useDishesGroup } from "../../stores/dishesGroup.js";
import {ref} from "vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";


const useStore = useDishesGroup();

useStore.getDishesGroup();

const dishesGroupList = ref(useStore.dishesGroup);

//console.log(dishesGroupList);

function pushIdGroup(id) {
    useStore.setChangedGroup(id)
}

function setAllGroup() {
    useStore.setChangedGroup(0)
}

</script>

<template>
    <div class="flex flex-col justify-between p-4 border rounded-2xl bg-white">
        <H2 class="mb-4">Группы блюд</H2>
        <TextButtonAlfa class="mb-2" @click="setAllGroup()">Все блюда</TextButtonAlfa>
        <div v-for="i in dishesGroupList" :key="i.id">
            <TextButtonAlfa class="mb-2" @click="pushIdGroup(i.id)">{{ i.name }}</TextButtonAlfa>
        </div>
        <H2>{{ useStore.changedGroup }}</H2>
    </div>
</template>

<style scoped>

</style>
