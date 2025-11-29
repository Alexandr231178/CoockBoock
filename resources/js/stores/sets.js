
//Вариант нейросети - работает
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';

// Название ключа для хранения данных в localStorage
const STORAGE_KEY_OF_SETS = 'setsData';

export const useSets = defineStore('sets', () => {

    // Используем реактивную переменную для хранения группы блюд
    const sets = ref({});

    // Функция для загрузки групп блюд с сервера
    async function getSets() {
        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/sets');

            // Сохраняем загруженные данные в localStorage
            saveToLocalStorage(data);

            // Обновляем значение реакционного состояния
            sets.value = data;
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err.message);
        }
    }

    //Функция заполнения таблицы sets_component
    async function fillingSetComponentTable(idNewSet, newSetOfDishesQuantity, rawArray){
        for (const dish of rawArray) {
            const dataForFillingTable = {
                'sets_of_dishes_id': idNewSet,
                'dishes_id': dish.id,
                'quantity': newSetOfDishesQuantity,
            };
            await axios.post('http://127.0.0.1:8000/api/sets-component', dataForFillingTable)
        }
    }


    //Функция для создания нового стола
    async function createNewSet(nameAndDescriptionObject, newSetOfDishesQuantity, rawArray) {
        const resp = await axios.post('http://127.0.0.1:8000/api/sets', nameAndDescriptionObject);
        const newSet = resp.data;
        //console.log(newSet)
        await fillingSetComponentTable(newSet.id, newSetOfDishesQuantity, rawArray);
        await getSets();
        //console.log(rawArray);

    }


    // Функция сохранения данных в localStorage
    function saveToLocalStorage(data) {
        if (!data || typeof data !== 'object') return;

        try {
            localStorage.setItem(STORAGE_KEY_OF_SETS, JSON.stringify(data));
        } catch (err) {
            console.warn("Не удалось сохранить данные в localStorage:", err.message);
        }
    }

    // Функция восстановления данных из localStorage
    function restoreFromLocalStorage() {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY_OF_SETS);
            if (storedData && storedData.length > 0) {

                // Восстанавливаем состояние в стор-хук
                sets.value = JSON.parse(storedData);
            }
        } catch (err) {
            console.warn("Ошибка при восстановлении данных из localStorage:", err.message);
        }
    }

    // Выполняем восстановление данных сразу при создании стор-хука
    restoreFromLocalStorage();




    return { sets, getSets, createNewSet };
})
