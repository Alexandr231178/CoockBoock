import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useProducts = defineStore('products', () => {
    const products = ref();
    async function getAllProducts() {
        const resp = await axios.get('http://127.0.0.1:8000/api/products');
        products.value = resp.data;
    }
    //Переменная сохраняющая в себе набор продуктов блюда, выбранного для редактирования
    let changeDishProducts = ref();









    return { products, changeDishProducts, getAllProducts };
})

