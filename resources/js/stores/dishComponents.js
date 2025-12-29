import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useDishComponents = defineStore('dishComponents', () => {
    const dishComponents = ref();
    async function getAllDishComponents() {
        const resp = await axios.get('http://127.0.0.1:8000/api/dishes-component');
        dishComponents.value = resp.data;
    }

    async function deleteDishComponent(id) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/dishes-component/${id}`);
            console.log(`Запрос на удаление ${id} ушел`)
        } catch (err) {console.log("Запрос не ушел")}

    }


    return { dishComponents, getAllDishComponents, deleteDishComponent };
})
