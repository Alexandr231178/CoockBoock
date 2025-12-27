
<script setup>
import { useDishes } from "../../stores/dishes.js";
import { useDishesGroup } from "../../stores/dishesGroup.js";
import { useSets } from "../../stores/sets.js";
import { useResultList } from "../../stores/resultList.js";
import { useProducts} from "../../stores/products.js";
import { useDishComponents} from "../../stores/dishComponents.js";
import {computed, ref, watch} from "vue";
import { useRouter } from "vue-router";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cange from "../icons/Cange.vue";
import Delete from "../icons/Delete.vue";
import TextButton from "../buttons/TextButton.vue";
import CreateNewDishScreen from "./CreateNewDishScreen.vue";
import UpdateDishesScreen from "./UpdateDishesScreen.vue";
import AddProductScreen from "../entityScreens/AddProductScreen.vue";

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
    ()=> {
        changeIdGroup.value = useStoreDishesGroup.changedGroup;
        changedGroup.value = dishesGroupList.find(obj => obj.id === changeIdGroup.value);
    }
)

const createOrUpdateScreen = ref('create');
const selectedId = ref(null);
const selectedDishName = ref(null);
const selectedDishDescription = ref(null); // Переименовал для ясности
const selectedDishQuantityPerson = ref(null);
const howToCook = ref(null);

function changeFunction(id, name, description, howToCookValue, quantity) {
    // Присваиваем значения ref-переменным, а не строковым параметрам
    selectedId.value = id;
    selectedDishName.value = name;
    selectedDishDescription.value = description; // Используем ref переменную
    howToCook.value = howToCookValue;
    selectedDishQuantityPerson.value = quantity;

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
                        <button @click="changeFunction(i.id, i.name, i.description, i.how_to_cook, i.quantity)">
                            <Cange></Cange>
                        </button>
                        <button @click="deleteFunction(i.id)"><Delete></Delete></button>
                    </div>
                </div>
                <TextButton @click="createNewDish">Создать новое блюдо</TextButton>
            </div>
            <div class="border-e-4" v-if="createOrUpdateScreen === 'create'">
                <CreateNewDishScreen></CreateNewDishScreen>
            </div>
            <div class="border-e-4" v-if="createOrUpdateScreen === 'update'">
                <UpdateDishesScreen
                    :selected-id="selectedId"
                    :selected-dish-name="selectedDishName"
                    :selected-dish-description="selectedDishDescription"
                    :selected-dish-quantity-person="selectedDishQuantityPerson"
                    :how-to-cook="howToCook">
                </UpdateDishesScreen>
            </div>
            <div>
                <AddProductScreen></AddProductScreen>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* стили */
</style>
