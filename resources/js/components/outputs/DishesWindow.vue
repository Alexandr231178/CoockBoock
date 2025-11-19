<script setup>
import { useDishes } from "../../stores/dishes.js";
import {ref} from "vue";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";


const useStore = useDishes();

useStore.getDishes();

const dishesList = ref(useStore.dishes);


</script>

<template>
    <div class="border rounded-2xl bg-white">
        <div class="flex">
            <div>
                <div class="mr-1.5" v-for="i in dishesList" :key="i.id">
                    <TextButtonAlfa class="mb-2">{{ i.name }}</TextButtonAlfa>
                </div>
            </div>
            <div>
                <div class="mr-1.5" v-for="i in dishesList" :key="i.id">
                    <TextButtonAlfa class="mb-2">{{ i.name }}</TextButtonAlfa>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <TextButtonLittle class="mr-2">Записать стол</TextButtonLittle>
            <TextButtonLittle class="mr-2">Сформировать список</TextButtonLittle>
        </div>
    </div>

</template>

<style scoped>

</style>
