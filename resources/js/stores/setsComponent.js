//Вариант нейросети - работает
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';

// Название ключа для хранения данных в localStorage
const STORAGE_KEY_OF_SETS_COMPONENT = 'setsComponentData';

export const useSetsComponent = defineStore('setsComponent', () => {

    // Используем реактивную переменную для хранения группы блюд
    const setsComponent = ref({});

    // Функция для загрузки групп блюд с сервера
    async function getSetsComponent() {
        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/sets-component');

            // Сохраняем загруженные данные в localStorage
            saveToLocalStorage(data);

            // Обновляем значение реакционного состояния
            setsComponent.value = data;
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err.message);
        }
    }

    //Функция для удаления конкретного комплнента стола
    async function deleteSetComponent(id) {
        await axios.delete(`http://127.0.0.1:8000/api/sets-component/${id}`);
        await getSetsComponent();
    }


    //Функция для подготовки данных на отправку для изменения компонентов стола
    function preparateDataForUpdateSetComponents(data) {
        let dataForDeleteSetComponentList = [];
        let dataForAddSetComponentList = [];
        let dataNotUpdateSetComponentList = [];
        data.forEach((element)=> {
            let elementObject = {};

            if (element.id === null) {
                elementObject['sets_of_dishes_id'] = element.sets_of_dishes_id;
                elementObject['dishes_id'] = element.dishes_id;
                elementObject['quantity'] = element.quantity;
            }

            if (element.id !== null) {
                dataNotUpdateSetComponentList.push(element.id);
            }

            if (Object.keys(elementObject).length > 0) {
                dataForAddSetComponentList.push(elementObject);
            }
        })

        setsComponent.value.forEach((element)=> {
            if (element.sets_of_dishes_id === data[0].sets_of_dishes_id) {
                dataForDeleteSetComponentList.push(element.id)
            }
        })

        // console.log('Данные на удаление до фильтрации ');
        // console.log(dataForDeleteSetComponentList);

        const resultDataForDeleteSetComponentList = dataForDeleteSetComponentList.filter(
            dataForDeleteSetComponentList => !dataNotUpdateSetComponentList.includes(dataForDeleteSetComponentList));

        return [dataForAddSetComponentList, resultDataForDeleteSetComponentList];
    }


    //Функция для отправки данных на изменение компонентов стола
    async function updateSetsComponent(data) {
        console.log('Данные, попавшие в функцию изменения компонентов стола: ');
        console.log(data);
        const preparatedData = preparateDataForUpdateSetComponents(data);
        console.log('Данные, подготовленные к изменениям компонентов стола: ');
        console.log(preparatedData);
        for (const element of preparatedData[0]) {
            await axios.post('http://127.0.0.1:8000/api/sets-component', element);
        }

        for (const element of preparatedData[1]) {
            await axios.delete(`http://127.0.0.1:8000/api/sets-component/${element}`);
        }

        await getSetsComponent();
    }

    // Функция сохранения данных в localStorage
    function saveToLocalStorage(data) {
        if (!data || typeof data !== 'object') return;

        try {
            localStorage.setItem(STORAGE_KEY_OF_SETS_COMPONENT, JSON.stringify(data));
        } catch (err) {
            console.warn("Не удалось сохранить данные в localStorage:", err.message);
        }
    }

    // Функция восстановления данных из localStorage
    function restoreFromLocalStorage() {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY_OF_SETS_COMPONENT);
            if (storedData && storedData.length > 0) {

                // Восстанавливаем состояние в стор-хук
                setsComponent.value = JSON.parse(storedData);
            }
        } catch (err) {
            console.warn("Ошибка при восстановлении данных из localStorage:", err.message);
        }
    }

    // Выполняем восстановление данных сразу при создании стор-хука
    restoreFromLocalStorage();





    return { setsComponent, getSetsComponent, deleteSetComponent, updateSetsComponent};
})

