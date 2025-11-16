import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useDishesGroup = defineStore('dishesGroup', ()=>{

    const dishesGroup = ref({})

    async function getDishesGroup() {
        const  {data}  = await axios.get('http://127.0.0.1:8000/api/dishesgroup');
        dishesGroup.value = data;
    }

    return { dishesGroup, getDishesGroup }
});
