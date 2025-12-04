import {defineStore} from "pinia";
import {toRaw} from 'vue';

export const useResultList = defineStore('result', ()=> {
    let resultList = [];
    let dishesList = [];


    //Функция которая убирает дубли и складывает количество продуктов из дублей
    function removeRepetition(dataFromDishcomponent) {
        const temp = {};
        for (const item of dataFromDishcomponent) {
            if (temp[item.products_id]) {
                temp[item.products_id].resultQuantity += item.resultQuantity;
            } else {
                temp[item.products_id] = {
                    products_id: item.products_id,
                    resultQuantity: item.resultQuantity
                };
            }
        }
        return Object.values(temp)
    }

    //Функция которая вместо id вставляет в объект наименование продукта
    function createProductList(dishComponentList, products) {
        dishComponentList.forEach((elem) => {
            elem['productName'] = toRaw(products).filter(item => item.id === elem.products_id)[0].name;
        })
    }


    //Функция которая возвращает отфильтрованную таблицу компонентов для выбранных блюд
    function productListGenerate(setQuantiti, rawArray, dishComponents) {
        let dataFromDishcomponent = [];
        rawArray.forEach((element)=>{
            const dish5Items = toRaw(dishComponents).filter(item => item.dish_id === element.id);
            dish5Items.forEach((item) => {
                // item['dishName'] = element.name;
                item['resultQuantity'] = setQuantiti/element.quantity*item.quantity;
            })
            dataFromDishcomponent.push(dish5Items);

        });
        dataFromDishcomponent = dataFromDishcomponent.flat()



        return removeRepetition(dataFromDishcomponent);
        //return dataFromDishcomponent;
    }

//Основная функция генерирующая результат**************************************************************************
    function resultListGenerate(setName, setQuantiti, setDescription, rawArray, products, dishComponents) {

        resultList.push(setName);
        resultList.push(setQuantiti);
        resultList.push(setDescription);

        rawArray.forEach((element)=> {
            dishesList.push(element.name);
        })
        resultList.push(dishesList);

        const dishComponentList = productListGenerate(setQuantiti, rawArray, dishComponents)
        createProductList(dishComponentList, products);

        resultList.push(dishComponentList);

        //console.log(setName, setQuantiti, setDescription, rawArray, toRaw(products)[1].name , toRaw(dishComponents)[1].products_id);
        //console.log(toRaw(dishComponents));
        // console.log(dishComponentList);
        // console.log(rawArray);
        console.log(resultList);
        //Не забыть обнулить resultList после выполнения логики этой функции

    }

    return { resultList, resultListGenerate }
})

