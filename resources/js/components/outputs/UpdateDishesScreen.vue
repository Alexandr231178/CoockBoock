<script setup>
import H1 from "../titles/H1.vue";
import H2 from "../titles/H2.vue";
import {defineProps, ref, watch} from 'vue';


import { useDishComponents } from "../../stores/dishComponents.js";
import { useProducts } from "../../stores/products.js";
import TextButton from "../buttons/TextButton.vue";
import AtherInputs from "../Inputs/AtherInputs.vue";
import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";
import Cross from "../icons/Cross.vue";

const useStoreProducts = useProducts();
const useStoreDishComponents = useDishComponents();

useStoreDishComponents.getAllDishComponents();
useStoreProducts.getAllProducts();

const props = defineProps({
    selectedId: {
        type: Number,
        default: null
    },

    selectedDishName: {
        type: String,
        default: null
    },

    selectedDishDescription: {
        type: String,
        default: null
    },

    howToCook: {
        type: String,
        default: null
    },

    selectedDishQuantityPerson: {
        type: Number,
        default: null
    },

})

const dishComponentsList = ref(useStoreDishComponents.dishComponents);
let changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId);

const productsList = ref(useStoreProducts.products);
let changeProducts = ref([]);




const updateDishName = ref(props.selectedDishName);
const updateDishDescription = ref(props.selectedDishDescription);
const updateDishQuantityPerson = ref(props.selectedDishQuantityPerson);
const updateDishHowToCook = ref(props.howToCook);

//Функция которая делает массив объектов для редактирования
function updateDishPrepare() {
    changedDishComponents.forEach((element) => {
        productsList.value.forEach((el) => {
            if(el.id === element.products_id) {
                let data = {};
                data['id'] = el.id;
                data['name'] = el.name;
                data['quantity'] = element.quantity;
                changeProducts.value.push(data);
            }
        })
    })
    useStoreProducts.changeDishProducts = changeProducts.value; //Ложим продукты выбранного блюда в стор в переменную
    //console.log(changeProducts);
    //console.log(useStoreProducts.changeDishProducts);
}
//запустим эту функцию
updateDishPrepare()


const updateProductQuontity = ref(changeProducts.value.quantity);

//Функция которая отправляет запрос на обновление записи в таблице блюд
function updateDish() {
    // 1) Взять актуальные данные для таблицы блюд
    // 2) Отправить запрос на обновление этой таблицы
}

//Функция которая добавляет новый продукт, если его нет в базе данных
function addProductInDataBase() {

}
//Функция которая отправляет запрос на изменение записей в таблице компонентов блюд
function updateDishComponent() {
    // 1) Взять актуальный  useStoreProducts.changeDishProducts и сравнить названия продуктов

}


//******************************************************************************************************************************************
//Функция которая отправляет запрос на удаление продукта из таблицы компонентов  ГОТОВА
function deleteDishesComponent() {
    const result = changedDishComponents.filter(item => !changeProducts.value.some(obj => Number(obj.id)  === Number(item.products_id)));
    //console.log(result);
    result.forEach((dishComponent) => {
        //console.log(dishComponent.id);
        useStoreDishComponents.deleteDishComponent(dishComponent.id);
    });
    useStoreDishComponents.getAllDishComponents();
 }



//Функция которая применяет все функции изменений по нажатии кнопки "Редактировать рецепт"
function updateDishAll() {
    console.log(`Начальный массив компонентов:`, changedDishComponents);
    console.log(`Массив для отправки запроса:`, changeProducts.value);

}

watch(
    () => useStoreProducts.changeDishProducts,
    () => {changeProducts.value = useStoreProducts.changeDishProducts;
        //console.log(changeProducts.value);
    }
)

watch(
    () => props.selectedId,
    () => {changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId);
        updateDishPrepare();
    }
)


//Функция удаления продукта из блюда
function deleteProductFromDish(id) {
    //console.log(`Нажат крестик удаления блюда с фй-ди: ${id}`);
    useStoreProducts.changeDishProducts = useStoreProducts.changeDishProducts.filter(item => item.id !== id);
}


</script>

<template>
    <H2>Редактирование блюда {{ props.selectedDishName }}</H2>
    <AtherInputs v-model="updateDishName" placeholder="Здесь будет имя выбранного блюда" class="mb-2"></AtherInputs>
    <AtherInputs v-model="updateDishDescription" placeholder="Здесь будет описание выбранного блюда" class="mb-2"></AtherInputs>
    <AtherInputs v-model="updateDishQuantityPerson" placeholder="Здесь будет количество порций" class="mb-2"></AtherInputs>
    <AtherInputs v-model="updateDishHowToCook" placeholder="Здесь будет как готовить" class="mb-2"></AtherInputs>

    <div v-for="product in changeProducts" :key="product.id">
        <div class="flex items-center gap-2 w-full">
            <TextButtonAlfa class="w-[70%]">{{ product.name }}</TextButtonAlfa>
            <AtherInputs class="w-[20%]" :placeholder="product.quantity"></AtherInputs>
            <Cross class="w-[10%] flex justify-center" @click="deleteProductFromDish(product.id)"></Cross>
        </div>

    </div>

    <div>
        <TextButton @click="deleteDishesComponent">Редактировать рецепт</TextButton>
    </div>

</template>

<style scoped>

</style>

