<script setup>
import { useSets } from "../../stores/sets.js";
import { useSetsComponent } from "../../stores/setsComponent.js";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cange from "../icons/Cange.vue";
import Delete from "../icons/Delete.vue";
import {ref, toRaw, watch} from "vue";

const useStoreSets =useSets();
useStoreSets.getSets();
const setsList = ref(useStoreSets.sets);

const useStoreSetsComponent = useSetsComponent();
useStoreSetsComponent.getSetsComponent();
const setsComponentList = ref(useStoreSetsComponent.setsComponent);

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

//Функция которая отбирает из списка компонентов только компоненты выбранного стола и складывает их в массив
function createChangeComponentList(setsComponentList, id) {
    let result = [];
    const setsComponentListChanges = setsComponentList.value.filter(item => item.sets_of_dishes_id === id);
    setsComponentListChanges.forEach((element) => {
        let res = {};
        res['id'] = element.id;
        res['sets_of_dishes_id'] = element.sets_of_dishes_id;
        result.push(res);
    })
    return result
}

function changeFunction(id) {
    console.log('Вызвана функция редактирования', id)
    const setsComponentChangeList = createChangeComponentList(setsComponentList, id);
    console.log(setsComponentChangeList);

}

function deleteFunction(id) {
    console.log('Вызвана функция удаления', id)
    useStoreSets.deleteSet(id);
    useStoreSets.getSets();
    const setsComponentChangeList = createChangeComponentList(setsComponentList, id);
    setsComponentChangeList.forEach((element) => {
        useStoreSetsComponent.deleteSetComponent(element.id)
    })
    useStoreSetsComponent.getSetsComponent();
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
