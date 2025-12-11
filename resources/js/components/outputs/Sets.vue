<script setup>

import H2 from "../titles/H2.vue";
import { useSets } from "../../stores/sets.js";
import { useDishes } from "../../stores/dishes.js";
import { useResultList } from "../../stores/resultList.js";
import { useSetsComponent } from "../../stores/setsComponent.js";
import { useProducts } from "../../stores/products.js";
import { useDishComponents } from "../../stores/dishComponents.js";
import {ref, toRaw, watch} from "vue";
import { useRouter } from "vue-router";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";

const useStore = useSets();
const useStoreDishes = useDishes();
const useStoreSetsltList = useResultList();
const useStoreSetsComponent = useSetsComponent();
const useStoreProducts = useProducts();
const useStoreDishComponents = useDishComponents();
const setsList = ref(useStore.sets);
const router = useRouter()


useStore.getSets();
useStoreSetsComponent.getSetsComponent();
useStoreDishComponents.getAllDishComponents();
useStoreDishes.getDishes();
useStoreProducts.getAllProducts();

watch(
    () => useStore.sets,
    () => {
        setsList.value = useStore.sets;
    }
)

// Массив выбранных элементов
const selectedItems = ref([])

// Отвечает за состояние кнопки
const isButtonDisabled = ref(true)

// Обработчик выбора чекбоксов
const handleCheckboxChange = () => {
    // Если выбрано хотя бы одно значение, делаем кнопку активной
    isButtonDisabled.value = selectedItems.value.length === 0
}

// Функция обработки клика по кнопке
const onSubmit = () => {
    let selectedSets = [];
    selectedItems.value.forEach((elem) => {
        const found = setsList.value.find(item => item.id === elem);
        if (found) {
            selectedSets.push(found);
        }
    })

    useStoreSetsltList.resultList2Generate(
        selectedSets, //Выбранные столы
        useStoreSetsComponent.setsComponent, //Компоненты столов
        useStoreDishes.dishes, //Блюда
        useStoreDishComponents.dishComponents, //Компоненты блюд
        useStoreProducts.products //Продукты
    )
    router.push({name: 'result2'})
  }

</script>

<template>
    <div class="flex flex-col p-4 border rounded-2xl bg-white">
        <H2 class="mb-4">Столы</H2>
        <form @submit.prevent="onSubmit">
            <div v-for="i in setsList" :key="i.id" class="mb-2">
                <input type="checkbox" :value="i.id" :id="i.id" :name="i.name" v-model="selectedItems" @change="handleCheckboxChange"/>
                {{ i.name }}
            </div>
            <TextButtonLittle :disabled="isButtonDisabled">Сформировать список</TextButtonLittle>
        </form>
    </div>
</template>


<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
