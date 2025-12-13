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

    //Функция которая убирает дубли из компонентов столов и складывает количество персон блюд
    function removeRepetitionSetComponentList(data) {
        const result = data.reduce((acc, item) => {
            const existing = acc.find(i => i.dishes_id === item.dishes_id);

            if (existing) {
                existing.quantity += item.quantity;
            } else {
                acc.push({dishes_id: item.dishes_id, quantity: item.quantity});
            }
            return acc;
        }, []);
        return result;
    }

    //Функция, оставляющая в компоненты только выбранных столов
    function componentsOfSelectedSets(selectedSets, setsComponent) {
        let filtredSetComponent = [];
        selectedSets.forEach((element) => {
            const setComponentFiltred = toRaw(setsComponent).filter(item => item.sets_of_dishes_id === element.id);
            filtredSetComponent.push(setComponentFiltred);
        })
        filtredSetComponent = filtredSetComponent.flat();
        return removeRepetitionSetComponentList(filtredSetComponent);

    }

    //Функция которая берет результат componentsOfSelectedSets, добавляет название блюда и считает коэффициент для продуктов
    function createDishesListFinal(componentsOfSelectedSetsResult, dishes) {
        componentsOfSelectedSetsResult.forEach((element) => {
            element['DishName'] = toRaw(dishes).filter(item => item.id === element.dishes_id)[0].name;
            element['kf'] = element.quantity / toRaw(dishes).filter(item => item.id === element.dishes_id)[0].quantity;
        })
    }


    //Функция которая берет результат createDishesListFinal и dishComponents выбранных блюд (из выбранных столов) и применяет считает потребность продукта
    function createProductList(selectedSetsComponents, dishComponents) {
        let dishComponentChanges = [];
        selectedSetsComponents.forEach((element) => {
            const res = toRaw(dishComponents).filter(item => item.dish_id === element.dishes_id);
            res.forEach((el) => {
                el['resultCount'] = element.kf * el.quantity;
            })
            dishComponentChanges.push(res);
        });
        return dishComponentChanges.flat()
    }

    //Функция которая берет результат createProductList (dishComponents выбранных блюд), убирает дубли, складывает количество и прилепляет название продукта
    function resultProductList(dishComponentChanges, products) {
        const result = dishComponentChanges.reduce((acc, item) => {
            const existing = acc.find(i => i.products_id === item.products_id);
            if (existing) {
                existing.resultCount += item.resultCount;
            } else {
                acc.push({products_id: item.products_id, resultCount: item.resultCount});
            }
            return acc;
        }, []);
        result.forEach((element) => {
            products.forEach((el) => {
                if(element.products_id === el.id) {
                    element['productName'] = el.name;
                }
            })
        })

        return result;
    }


    function resultList2Generate(
        selectedSets, //Выбранные столы
        setsComponent, //Компоненты столов
        dishes, //Блюда
        dishComponents, //Компоненты блюд
        products //Продукты
    ) {
        const selectedSetsComponents = componentsOfSelectedSets(selectedSets, setsComponent);
        createDishesListFinal(selectedSetsComponents, dishes);

        const mediateResulr = createProductList(selectedSetsComponents, dishComponents);
        const productList = resultProductList(mediateResulr, products)

        resultList2.value =  [selectedSets, selectedSetsComponents, productList];
        console.log(resultList2.value);
    }




    return { resultList, resultList2, resultListGenerate, resultList2Generate }
})

