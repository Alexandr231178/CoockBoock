import {defineStore} from "pinia";
import {ref, toRaw} from 'vue';

export const useResultList = defineStore('result', ()=> {
    let resultList = [];
    let resultList2 = ref([]);
    let dishesList = [];

//Блок функций для ResultList******************************************************************************************
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

        const dishComponentList = productListGenerate(setQuantiti, rawArray, dishComponents)
        createProductList(dishComponentList, products);

        rawArray.forEach((element)=> {
            dishesList.push(element.name);
        })
        resultList.push(dishesList);


        resultList.push(dishComponentList);

        console.log(rawArray);
        console.log(dishesList);
        //Не забыть обнулить resultList после выполнения логики этой функции
        resultList = [];

    }

    //Блок функций для ResultList2******************************************************************************************

    function resultList2Generate(
        selectedSets,
        setsComponent,
        dishes,
        dishComponents,
        products) {
        resultList2.value =  [selectedSets, setsComponent, dishes, dishComponents, products];
        console.log(resultList2.value);
    }




    return { resultList, resultList2, resultListGenerate, resultList2Generate }
})

