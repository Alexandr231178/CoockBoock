import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useResultList = defineStore('result', ()=> {
    let resultList = [];
    let dishesList = [];

    function resultListGenerate(setName, setQuantiti, setDescription, rawArray, products, dishComponents) {
        resultList.push(setName);
        resultList.push(setQuantiti);
        resultList.push(setDescription);

        rawArray.forEach((element)=> {
            dishesList.push(element.name);
        })
        resultList.push(dishesList);




        //console.log(setName, setQuantiti, setDescription, rawArray, products , dishComponents);
        //console.log(resultList);
        //Не забыть обнулить resultList после выполнения логики этой функции



    }

    return { resultList, resultListGenerate }
})

