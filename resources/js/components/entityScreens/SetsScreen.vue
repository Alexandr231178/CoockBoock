<script setup>
import { useSets } from "../../stores/sets.js";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cange from "../icons/Cange.vue";
import Delete from "../icons/Delete.vue";

const useStoreSets =useSets();
useStoreSets.getSets();
const setsList = useStoreSets.sets;

function changeFunction(id) {
    console.log('Вызвана функция редактирования', id)
}

function deleteFunction(id) {
    console.log('Вызвана функция удаления', id)
}

</script>

<template>
    <div class="container">
        <div class="rounded-2xl bg-white p-4">
            <div class="mb-1 flex gap-1" v-for="set in setsList" :key="set.id">
                <TextButtonAlfa>{{ set.name }}</TextButtonAlfa>
                <button @click="changeFunction(set.id)"><Cange></Cange></button>
                <button @click="deleteFunction(set.id)"><Delete></Delete></button>
            </div>
            <div>
<!--                Здесь будет окно редактирования-->
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
