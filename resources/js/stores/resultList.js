import axios from "axios";
import { defineStore } from "pinia";
import {ref, toRaw} from 'vue';

export const useResultList = defineStore('result', ()=> {
    let resultList = [];
    let dishesList = [];
    let productList = [];

    //Функция которая возвращает отфильтрованную таблицу компонентов для выбранных блюд
    //Пока возвращает массив массивов
    function productListGenerate(setQuantiti, rawArray, dishComponents) {
        let dataFromDishcomponent = [];
        rawArray.forEach((element)=>{
            const dish5Items = toRaw(dishComponents).filter(item => item.dish_id === element.id);
            dataFromDishcomponent.push(dish5Items);
        });
        return dataFromDishcomponent;
    }


    function resultListGenerate(setName, setQuantiti, setDescription, rawArray, products, dishComponents) {

        resultList.push(setName);
        resultList.push(setQuantiti);
        resultList.push(setDescription);

        rawArray.forEach((element)=> {
            dishesList.push(element.name);
        })
        resultList.push(dishesList);

        const dishComponentList = productListGenerate(setQuantiti, rawArray, dishComponents)

        //console.log(setName, setQuantiti, setDescription, rawArray, toRaw(products)[1].name , toRaw(dishComponents)[1].products_id);
        console.log(toRaw(dishComponents));
        console.log(dishComponentList);
        //console.log(resultList);
        //Не забыть обнулить resultList после выполнения логики этой функции

    }

    return { resultList, resultListGenerate }
})

