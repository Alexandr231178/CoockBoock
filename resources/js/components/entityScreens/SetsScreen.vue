<script setup>
import { useSets } from "../../stores/sets.js";
import { useSetsComponent } from "../../stores/setsComponent.js";
import { useDishes } from "../../stores/dishes.js";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cange from "../icons/Cange.vue";
import Delete from "../icons/Delete.vue";
import {ref, toRaw, watch} from "vue";
import AtherInputs from "../Inputs/AtherInputs.vue";
import H2 from "../titles/H2.vue";
import Arrow from "../icons/Arrow.vue";

const useStoreSets =useSets();
useStoreSets.getSets();
const setsList = ref(useStoreSets.sets);

const useStoreSetsComponent = useSetsComponent();
useStoreSetsComponent.getSetsComponent();
const setsComponentList = ref(useStoreSetsComponent.setsComponent);
const numberPersonsSelectedSet = ref();

const useStoreDishes = useDishes();
useStoreDishes.getDishes();
const dishes = ref(useStoreDishes.dishes);

const updateSetId = ref();
const updateSetName = ref();
const updateDescription = ref();
let updateDishesList = ref([]);

watch(
    () => useStoreSets.sets,
    () => {
        setsList.value = useStoreSets.sets;
    }
)

watch(
    () => useStoreSetsComponent.setsComponent,
    () => {
        setsComponentList.value = useStoreSetsComponent.setsComponent;
    }
)

watch(
    () => useStoreDishes.dishes,
    () => {
        dishes.value = useStoreDishes.dishes;
    }
)

//Функция изменяющая стол
function updateSelectedSet(id) {
    const dataForUpdateSet = {id: id, name: updateSetName.value, description: updateDescription.value};
    const dataForUpdateSetComponent = [];
    updateDishesList.value.forEach((element)=> {
        let data = {};
        data['id'] = element.id;
        data['sets_of_dishes_id'] = id;
        data['dishes_id'] = element.dishes_id;
        data['quantity'] = numberPersonsSelectedSet.value;
        dataForUpdateSetComponent.push(data);
    })
    useStoreSets.updateSet(id, dataForUpdateSet);
    useStoreSetsComponent.updateSetsComponent(dataForUpdateSetComponent);

    // console.log(dataForUpdateSet);
    // console.log(dataForUpdateSetComponent);
}

//Функция которая отбирает из списка компонентов только компоненты выбранного стола и складывает их в массив
function createChangeComponentList(setsComponentList, id) {
    let result = [];
    const setsComponentListChanges = setsComponentList.value.filter(item => item.sets_of_dishes_id === id);
    setsComponentListChanges.forEach((element) => {
        let res = {};
        res['id'] = element.id;
        res['sets_of_dishes_id'] = element.sets_of_dishes_id;
        res['dishes_id'] = element.dishes_id;
        res['quantityPerson'] = element.quantity;
        result.push(res);
    })
    numberPersonsSelectedSet.value = result[0].quantityPerson;
    return result
}

function changeFunction(id) {
    updateSetId.value = id;
    updateDishesList.value = createChangeComponentList(setsComponentList, id);
    updateDishesList.value.forEach((element) => {
        dishes.value.forEach((el)=> {
            if(element.dishes_id === el.id) {
                element['dishesName'] = el.name;
            }
        })
    })
    const changeSet = setsList.value.filter(item => item.id === id);
    updateSetName.value = changeSet[0].name;
    updateDescription.value = changeSet[0].description;

    //console.log(updateDishesList.value);
}

function deleteFunction(id) {
    //console.log('Вызвана функция удаления', id)
    useStoreSets.deleteSet(id);
    useStoreSets.getSets();
    const setsComponentChangeList = createChangeComponentList(setsComponentList, id);
    setsComponentChangeList.forEach((element) => {
        useStoreSetsComponent.deleteSetComponent(element.id)
    })
    useStoreSetsComponent.getSetsComponent();
}

function deleteDishFunction(id) {
    //console.log('Вызвана функция удаления', id)
    //updateDishesList.value = updateDishesList.value.pop(id)
    updateDishesList.value = updateDishesList.value.filter(item => item.id !== id);
}

function addDishFunction(id) {
    let foundObject = dishes.value.find(obj => obj.id === id);
    const found = updateDishesList.value.find(item => item.dishesName === foundObject.name);
    if (!found) {
        let resultFoundObject = {id: null,
            sets_of_dishes_id: updateDishesList.value[0].sets_of_dishes_id,
            dishes_id: foundObject.id,
            dishesName: foundObject.name}
        updateDishesList.value.push(resultFoundObject);
    }
    //console.log(updateDishesList.value);
}




</script>

<template>
    <div class="container">
        <div class="rounded-2xl bg-white p-4 flex">
            <div class="mr-4 border-e-4 pr-4">
                <div class="mb-1 flex gap-1" v-for="set in setsList" :key="set.id">
                    <TextButtonAlfa>{{ set.name }}</TextButtonAlfa>
                    <button @click="changeFunction(set.id)"><Cange></Cange></button>
                    <button @click="deleteFunction(set.id)"><Delete></Delete></button>
                </div>
            </div>
            <div class="border-e-4 mr-4 pr-4">
                <H2>Окно редактирования стола</H2>
                <div>
                    <AtherInputs v-model="updateSetName" placeholder="Здесь будет имя выбранного стола" class="mb-2">
                    </AtherInputs>
                    <AtherInputs v-model="updateDescription" placeholder="Здесь будет описание стола" class="mb-2">
                    </AtherInputs>
                    <div v-for="dish in updateDishesList" :key="dish.id" class="mb-4 flex gap-1">
                        <TextButtonAlfa>{{ dish.dishesName }}</TextButtonAlfa>
                        <button @click="deleteDishFunction(dish.id)"><Delete></Delete></button>
                    </div>
                    <TextButtonAlfa @click="updateSelectedSet(updateSetId)">Изменить</TextButtonAlfa>
                </div>
            </div>
            <div class="mr-4 pr-4">
                <H2 class="mb-4">Окно добавления блюд</H2>
                <div>
                    <div v-for="dish in dishes" :key="dish.id" class="flex mb-2">
                        <Arrow @click="addDishFunction(dish.id)" class="mr-1 rotate-180"></Arrow>
                        <TextButtonAlfa class="">{{ dish.name }}</TextButtonAlfa>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
