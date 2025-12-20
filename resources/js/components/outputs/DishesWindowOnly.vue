<script setup>
import { useDishes } from "../../stores/dishes.js";
import { useDishesGroup } from "../../stores/dishesGroup.js";
import { useSets } from "../../stores/sets.js";
import { useResultList } from "../../stores/resultList.js";
import { useProducts} from "../../stores/products.js";
import { useDishComponents} from "../../stores/dishComponents.js";
import {computed, ref, watch} from "vue";
import {toRaw} from "vue";
import { useRouter } from "vue-router";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cange from "../icons/Cange.vue";
import Delete from "../icons/Delete.vue";
import TextButton from "../buttons/TextButton.vue";
import CreateNewDishScreen from "./CreateNewDishScreen.vue";
import UpdateDishesScreen from "./UpdateDishesScreen.vue";



const useStoreProducts = useProducts();
const useStoreDishComponents = useDishComponents();
const useStore = useDishes();
const useStoreDishesGroup = useDishesGroup();
const useStoreSets = useSets();
const useStoreResult = useResultList()
const dishesGroupList = useStoreDishesGroup.dishesGroup;
const router = useRouter();
let changedGroup = ref('Все объекты');
useStore.getDishes();
useStoreDishComponents.getAllDishComponents();
useStoreProducts.getAllProducts();
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

const createOrUpdateScreen = ref('create');
const selectedId = ref(null);



function changeFunction(id) {
    selectedId.value = id;
    createOrUpdateScreen.value = 'update';
}

function deleteFunction(id) {
    console.log(`Нажата кнопка удаления блюда ${id}`)
}

function createNewDish() {
    createOrUpdateScreen.value = 'create';
}


</script>

<template>
    <div class="p-4 border rounded-2xl bg-white">
        <div class="text-gray-500 mb-5">
            <H2 v-if="changeIdGroup !== 0">Выбрана группа блюд: <strong>{{ changedGroup.name }}</strong></H2>
            <H2 v-else-if="changeIdGroup === 0">Выбрана группа блюд: <strong>Все группы</strong> </H2>
        </div>
        <div class="flex mb-4">
            <div class="border-e-4">
                <div class="mr-1.5" v-for="i in dishesList" :key="i.id">
                    <div class="flex mb-2" v-if="i.dish_group_id === changeIdGroup || changeIdGroup === 0">
                        <TextButtonAlfa>{{ i.name }}</TextButtonAlfa>
                        <button @click="changeFunction(i.id)"><Cange></Cange></button>
                        <button @click="deleteFunction(i.id)"><Delete></Delete></button>
                    </div>
                </div>
                <TextButton @click="createNewDish">Создать новое блюдо</TextButton>
            </div>
            <div v-if="createOrUpdateScreen === 'create'">
                <CreateNewDishScreen></CreateNewDishScreen>
            </div>
            <div v-if="createOrUpdateScreen === 'update'">
                <UpdateDishesScreen :selected-id="selectedId"></UpdateDishesScreen>
            </div>
        </div>
    </div>


</template>

<style scoped>


</style>

