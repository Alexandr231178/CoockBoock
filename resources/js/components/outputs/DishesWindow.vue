<script setup>
import { useDishes } from "../../stores/dishes.js";
import { useDishesGroup } from "../../stores/dishesGroup.js";
import { useSets } from "../../stores/sets.js";
import { useResultList } from "../../stores/resultList.js";
import {computed, ref, watch} from "vue";
import {toRaw} from "vue";
import { useRouter } from "vue-router";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Arrow from "../icons/Arrow.vue";
import Cross from "../icons/Cross.vue";
import AtherInputs from "../Inputs/AtherInputs.vue";

const useStore = useDishes();
const useStoreDishesGroup = useDishesGroup();
const useStoreSets = useSets();
const useStoreResult = useResultList()
const dishesGroupList = useStoreDishesGroup.dishesGroup;
const router = useRouter()
let changedGroup = ref('Все объекты');
useStore.getDishes();
const dishesList = ref(useStore.dishes);
let newSetDishes = ref([]);
let changeIdGroup = ref(useStoreDishesGroup.changedGroup);
watch(
    ()=> useStoreDishesGroup.changedGroup,
    ()=> {changeIdGroup.value = useStoreDishesGroup.changedGroup;
        changedGroup.value = dishesGroupList.find(obj => obj.id === changeIdGroup.value);
    }
)

const newSetOfDishesName = ref('');
const newSetOfDishesQuantity = ref(4);
const newSetOfDishesDescription = ref('');
const canSubmit = computed(() => newSetOfDishesName.value.length > 0 && newSetOfDishesQuantity.value > 0);
const rawArray = toRaw(newSetDishes.value);

function writSet() {
    const nameDescriptionObject = {
        'name': newSetOfDishesName.value,
        'description': newSetOfDishesDescription.value
    }
    useStoreSets.createNewSet(nameDescriptionObject, newSetOfDishesQuantity.value, rawArray);
    newSetOfDishesName.value = '';
    newSetOfDishesDescription.value = '';
}

function generateList() {
    useStoreResult.resultListGenerate(newSetOfDishesName.value, newSetOfDishesQuantity.value,
        newSetOfDishesDescription.value, rawArray);
    router.push({name: 'result'});
}

function addNewSetDishes(id) {
    const alreadyExists = newSetDishes.value.some(p => p.id === id);
    let foundObject = dishesList.value.find(obj => obj.id === id);
    if (!alreadyExists) {
        newSetDishes.value.push(foundObject);
    }
}
function removeNewSetDishes(id) {
    newSetDishes.value = newSetDishes.value.filter(item => item.id !== id);
}
</script>

<template>
    <div class="p-4 border rounded-2xl bg-white">
        <div class="flex mb-4 gap-2">
            <AtherInputs v-model="newSetOfDishesName" class="new-set-name" placeholder="Введите название нового стола"></AtherInputs>
            <AtherInputs type="number" v-model="newSetOfDishesQuantity" class="quantity-person" placeholder="Количество"></AtherInputs>
            <AtherInputs type="text" v-model="newSetOfDishesDescription" class="new-set-name" placeholder="Описание"></AtherInputs>
        </div>
        <div class="text-gray-500 mb-5">
            <H2 v-if="changeIdGroup !== 0">Выбрана группа блюд: <strong>{{ changedGroup.name }}</strong></H2>
            <H2 v-else-if="changeIdGroup === 0">Выбрана группа блюд: <strong>Все группы</strong> </H2>
        </div>
        <div class="flex mb-4">
            <div class="border-e-4">
                <div class="mr-1.5" v-for="i in dishesList" :key="i.id">
                    <div class="flex mb-2" v-if="i.dish_group_id === changeIdGroup || changeIdGroup === 0">
                        <TextButtonAlfa class="mr-1">{{ i.name }}</TextButtonAlfa>
                        <Arrow @click="addNewSetDishes(i.id)"></Arrow>
                    </div>
                </div>
            </div>
            <div class="pl-4 mb-4">
                <div v-for="i in newSetDishes" :key="i.id">
                    <div class="flex mb-2">
                        <TextButtonAlfa class="mr-1">{{ i.name }}</TextButtonAlfa>
                        <Cross @click="removeNewSetDishes(i.id)"></Cross>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-end">
            <TextButtonLittle :disabled="!canSubmit" class="mr-2" @click="writSet">Записать стол</TextButtonLittle>
            <TextButtonLittle :disabled="!canSubmit" class="mr-2" @click="generateList">Сформировать список</TextButtonLittle>
        </div>
    </div>

</template>

<style scoped>
    .new-set-name {
        width: 300px;
    }

    .quantity-person {
        width: 120px;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

</style>

