import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useResultList = defineStore('result', ()=> {
    const resultList = ref();
    function resultListGenerate(setName, setQuantiti, setDescription, rawArray) {
        resultList.value = [setName, setQuantiti, setDescription, rawArray];
        //console.log(setName, setQuantiti, setDescription, rawArray)
    }

    return { resultList, resultListGenerate }
})

