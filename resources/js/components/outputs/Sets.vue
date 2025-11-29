<script setup>

import H2 from "../titles/H2.vue";
import { useSets } from "../../stores/sets.js";
import {ref} from "vue";
import TextButtonLittle from "../buttons/TextButtonLittle.vue";

const useStore = useSets();
useStore.getSets();
const setsList = ref(useStore.sets);


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
    console.log('Выбранные элементы:', selectedItems.value)
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
