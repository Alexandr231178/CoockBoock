<script setup>
import { useDishes } from "../../stores/dishes.js";
import { useDishesGroup } from "../../stores/dishesGroup.js";
import {ref} from "vue";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Arrow from "../icons/Arrow.vue";


const useStore = useDishes();
const useStoreDishesGroup = useDishesGroup();

useStore.getDishes();

const dishesList = ref(useStore.dishes);


let newSetDishes = ref([])
function addNewSetDishes(id) {
    newSetDishes.value.push(id);
    console.log(newSetDishes.value);
}


</script>

<template>
    <div class="p-4 border rounded-2xl bg-white">
        <div class="flex">
            <div>
                <div class="mr-1.5" v-for="i in dishesList" :key="i.id">
                    <div class="flex mb-2" v-if="i.dish_group_id === useStoreDishesGroup.changedGroup || useStoreDishesGroup.changedGroup === 0">
                        <TextButtonAlfa class="mr-1">{{ i.name }}</TextButtonAlfa>
                        <Arrow @click="addNewSetDishes(i.id)"></Arrow>
                    </div>
                </div>
            </div>
            <div>
                <div v-for="i in newSetDishes" :key="i">
                    <H2>{{ i }}</H2>
                </div>

            </div>
        </div>
        <div class="flex justify-end">
            <TextButtonLittle class="mr-2">Записать стол</TextButtonLittle>
            <TextButtonLittle class="mr-2">Сформировать список</TextButtonLittle>
        </div>
        <H2>{{ useStoreDishesGroup.changedGroup }}</H2>
    </div>

</template>

<style scoped>

</style>

