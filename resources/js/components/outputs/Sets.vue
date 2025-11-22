<script setup>

import H2 from "../titles/H2.vue";
import { useSets } from "../../stores/sets.js";
import {ref} from "vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";

const useStore = useSets();
useStore.getSets();
const setsList = ref(useStore.sets);

let staturButton = true;

</script>

<template>
    <div class="flex flex-col p-4 border rounded-2xl bg-white">
        <H2 class="mb-4">Столы</H2>
        <div v-for="i in setsList" :key="i.id">
            <TextButtonAlfa class="mb-2">{{ i.name }}</TextButtonAlfa>
        </div>
        <TextButtonLittle>Сформировать список</TextButtonLittle>
    </div>
</template>

<style scoped>

</style>
