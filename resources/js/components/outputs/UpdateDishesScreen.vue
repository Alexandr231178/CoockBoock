<!--<script setup>-->
<!--import H1 from "../titles/H1.vue";-->
<!--import H2 from "../titles/H2.vue";-->
<!--import {defineProps, ref, watch} from 'vue';-->


<!--import { useDishComponents } from "../../stores/dishComponents.js";-->
<!--import { useProducts } from "../../stores/products.js";-->
<!--import TextButton from "../buttons/TextButton.vue";-->
<!--import AtherInputs from "../Inputs/AtherInputs.vue";-->
<!--import TextButtonAlfa from "../buttons/TextButtonAlfa.vue";-->
<!--import Cross from "../icons/Cross.vue";-->

<!--const useStoreProducts = useProducts();-->
<!--const useStoreDishComponents = useDishComponents();-->

<!--useStoreDishComponents.getAllDishComponents();-->
<!--useStoreProducts.getAllProducts();-->

<!--const props = defineProps({-->
<!--    selectedId: {-->
<!--        type: Number,-->
<!--        default: null-->
<!--    },-->

<!--    selectedDishName: {-->
<!--        type: String,-->
<!--        default: null-->
<!--    },-->

<!--    selectedDishDescription: {-->
<!--        type: String,-->
<!--        default: null-->
<!--    },-->

<!--    howToCook: {-->
<!--        type: String,-->
<!--        default: null-->
<!--    },-->

<!--    selectedDishQuantityPerson: {-->
<!--        type: Number,-->
<!--        default: null-->
<!--    },-->

<!--})-->

<!--const dishComponentsList = ref(useStoreDishComponents.dishComponents);-->
<!--let changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId);-->

<!--const productsList = ref(useStoreProducts.products);-->
<!--let changeProducts = [];-->



<!--const updateDishName = ref(props.selectedDishName);-->
<!--const updateDishDescription = ref(props.selectedDishDescription);-->
<!--const updateDishQuantityPerson = ref(props.selectedDishQuantityPerson);-->
<!--const updateDishHowToCook = ref(props.howToCook);-->




<!--//Функция которая делает массив объектов для редактирования-->
<!--function updateDishPrepare() {-->
<!--    changeProducts = [];-->
<!--    changedDishComponents.forEach((element) => {-->
<!--        productsList.value.forEach((el) => {-->
<!--            if(el.id === element.products_id) {-->
<!--                let data = {};-->
<!--                data['id'] = el.id;-->
<!--                data['name'] = el.name;-->
<!--                data['quantity'] = element.quantity;-->
<!--                // data['dishName'] = props.selectedDishName;-->
<!--                // data['description'] = props.selectedDishDescription;-->
<!--                // data['selectedDishQuantityPerson'] = props.selectedDishQuantityPerson;-->
<!--                // data['howToCook'] = props.howToCook;-->
<!--                changeProducts.push(data);-->
<!--            }-->
<!--        })-->
<!--    })-->
<!--    console.log(changeProducts);-->
<!--}-->
<!--//запустим эту функцию-->
<!--updateDishPrepare()-->

<!--const updateProductQuontity = ref(changeProducts.quantity);-->

<!--//Функция которая отправляет на изменение данные-->
<!--function updateDish() {-->

<!--}-->

<!--watch(-->
<!--    () => props.selectedId,-->
<!--    () => {changedDishComponents = dishComponentsList.value.filter(item => item.dish_id === props.selectedId);-->
<!--        updateDishPrepare();-->
<!--    }-->
<!--)-->

<!--//Функция удаления продукта из блюда-->
<!--function deleteProductFromDish(id) {-->
<!--    console.log(`Нажат крестик удаления блюда с фй-ди: ${id}`)-->
<!--}-->


<!--</script>-->

<!--<template>-->
<!--    <H2>Редактирование блюда {{ props.selectedDishName }}</H2>-->
<!--    <AtherInputs v-model="updateDishName" placeholder="Здесь будет имя выбранного блюда" class="mb-2"></AtherInputs>-->
<!--    <AtherInputs v-model="updateDishDescription" placeholder="Здесь будет описание выбранного блюда" class="mb-2"></AtherInputs>-->
<!--    <AtherInputs v-model="updateDishQuantityPerson" placeholder="Здесь будет количество порций" class="mb-2"></AtherInputs>-->
<!--    <AtherInputs v-model="updateDishHowToCook" placeholder="Здесь будет как готовить" class="mb-2"></AtherInputs>-->

<!--    <div v-for="product in changeProducts" :key="product.id">-->
<!--        <div class="flex items-center gap-2 w-full">-->
<!--            <TextButtonAlfa class="w-[70%]">{{ product.name }}</TextButtonAlfa>-->
<!--            <AtherInputs class="w-[20%]" :placeholder="product.quantity"></AtherInputs>-->
<!--            <Cross class="w-[10%] flex justify-center" @click="deleteProductFromDish(product.id)"></Cross>-->
<!--        </div>-->

<!--    </div>-->
<!--    <div>-->
<!--        <TextButton @click="updateDish">Редактировать рецепт</TextButton>-->
<!--    </div>-->

<!--</template>-->

<!--<style scoped>-->

<!--</style>-->


<!--// Решение нейросети - адаптировать-->
<script setup>
import { ref, watch, computed } from 'vue'
import AtherInputs from '../inputs/AtherInputs.vue'
import TextButton from '../buttons/TextButton.vue'
import TextButtonAlfa from '../buttons/TextButtonAlfa.vue'
import Cross from '../icons/Cross.vue'

const props = defineProps({
    selectedId: Number,
    selectedDishName: String,
    selectedDishDescription: String,
    selectedDishQuantityPerson: Number,
    howToCook: String
})

// Реактивные переменные для основных данных блюда
const updateDishName = ref(props.selectedDishName || '')
const updateDishDescription = ref(props.selectedDishDescription || '')
const updateDishQuantityPerson = ref(props.selectedDishQuantityPerson || '')
const updateDishHowToCook = ref(props.howToCook || '')

// Реактивный массив для продуктов с их количествами
const changeProducts = ref([
    // Пример данных - в реальности они должны приходить из пропсов или хранилища
    { id: 1, name: 'Картофель', quantity: '500' },
    { id: 2, name: 'Морковь', quantity: '200' },
    { id: 3, name: 'Лук', quantity: '100' }
])

// Функция для удаления продукта из блюда
function deleteProductFromDish(productId) {
    changeProducts.value = changeProducts.value.filter(product => product.id !== productId)
}

// Функция для обновления количества продукта
function updateProductQuantity(productId, newQuantity) {
    const product = changeProducts.value.find(p => p.id === productId)
    if (product) {
        product.quantity = newQuantity
    }
}

// Функция для формирования объекта с обновленными данными
function updateDish() {
    // Собираем основной объект блюда
    const updatedDishData = {
        id: props.selectedId,
        name: updateDishName.value,
        description: updateDishDescription.value,
        quantity_person: Number(updateDishQuantityPerson.value) || 0,
        how_to_cook: updateDishHowToCook.value,
        // Собираем продукты с их количествами
        products: changeProducts.value.map(product => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity ? Number(product.quantity) : 0
        })),
        // Дополнительно можно добавить дату изменения
        updated_at: new Date().toISOString()
    }

    console.log('Обновленные данные блюда:', updatedDishData)

    // Здесь можно добавить вызов API для сохранения изменений
    // например: saveUpdatedDish(updatedDishData)

    // Или показать уведомление об успешном сохранении
    alert(`Блюдо "${updatedDishData.name}" успешно обновлено!`)

    return updatedDishData
}

// Следим за изменениями в пропсах и обновляем реактивные переменные
watch(() => props.selectedDishName, (newVal) => {
    updateDishName.value = newVal || ''
})

watch(() => props.selectedDishDescription, (newVal) => {
    updateDishDescription.value = newVal || ''
})

watch(() => props.selectedDishQuantityPerson, (newVal) => {
    updateDishQuantityPerson.value = newVal || ''
})

watch(() => props.howToCook, (newVal) => {
    updateDishHowToCook.value = newVal || ''
})
</script>

<template>
    <H2>Редактирование блюда {{ props.selectedDishName }}</H2>
    <AtherInputs v-model="updateDishName" placeholder="Здесь будет имя выбранного блюда" class="mb-2"></AtherInputs>
    <AtherInputs v-model="updateDishDescription" placeholder="Здесь будет описание выбранного блюда" class="mb-2"></AtherInputs>
    <AtherInputs v-model="updateDishQuantityPerson" placeholder="Здесь будет количество порций" class="mb-2" type="number"></AtherInputs>
    <AtherInputs v-model="updateDishHowToCook" placeholder="Здесь будет как готовить" class="mb-2"></AtherInputs>

    <div v-for="product in changeProducts" :key="product.id">
        <div class="flex items-center gap-2 w-full">
            <TextButtonAlfa class="w-[70%]">{{ product.name }}</TextButtonAlfa>
            <AtherInputs
                class="w-[20%]"
                :modelValue="product.quantity"
                @update:modelValue="(value) => updateProductQuantity(product.id, value)"
                type="number"
            ></AtherInputs>
            <Cross class="w-[10%] flex justify-center" @click="deleteProductFromDish(product.id)"></Cross>
        </div>
    </div>

    <div>
        <TextButton @click="updateDish">Редактировать рецепт</TextButton>
    </div>
</template>
