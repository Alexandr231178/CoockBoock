<!--С помощью нейросети-->
<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => []
    }
})

const emit = defineEmits(['addedProduct'])

const searchText = ref('')
const quantity = ref('')
const showDropdown = ref(false)
const selectedIndex = ref(-1)
const inputRef = ref(null)

const filteredItems = computed(() => {
    if (!searchText.value.trim()) {
        return props.items
    }

    const searchLower = searchText.value.toLowerCase()
    return props.items.filter(item =>
        item.name.toLowerCase().includes(searchLower)
    )
})

watch(searchText, () => {
    selectedIndex.value = -1
})

const handleInput = () => {
    showDropdown.value = true
}

const moveSelection = (direction) => {
    if (!showDropdown.value || filteredItems.value.length === 0) return

    const maxIndex = filteredItems.value.length - 1
    selectedIndex.value += direction

    if (selectedIndex.value < 0) {
        selectedIndex.value = maxIndex
    } else if (selectedIndex.value > maxIndex) {
        selectedIndex.value = 0
    }
}

const selectItem = (item) => {
    let selectedItem = item

    if (!selectedItem && selectedIndex.value >= 0) {
        selectedItem = filteredItems.value[selectedIndex.value]
    }

    if (selectedItem) {
        searchText.value = selectedItem.name
        emit('select', selectedItem)
    }

    showDropdown.value = false
    selectedIndex.value = -1
}

// Закрытие dropdown при клике вне компонента
const handleClickOutside = (event) => {
    if (!event.target.closest('.autocomplete')) {
        showDropdown.value = false
    }
}

// Добавляем обработчик клика вне компонента
import { onMounted, onUnmounted } from 'vue'
import TextButtonLittle from "../buttons/TextButtonLittle.vue";

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

function addProduct() {
    if (!searchText.value.trim() || !quantity.value) {
        console.log('Заполните все поля')
        return
    }

    const newProduct = {
        name: searchText.value,
        quantity: Number(quantity.value),
        id: Date.now() // временный ID
    }

    // Очистка полей
    searchText.value = ''
    quantity.value = ''
    showDropdown.value = false
    selectedIndex.value = -1


    // Или возвращаем массив, если нужно
    //return [product]
    emit("addedProduct", newProduct)
    //console.log(newProduct);
}
</script>

<template>
    <div class="autocomplete">
        <div class="flex gap-2">
            <input
                ref="inputRef"
                v-model="searchText"
                type="text"
                class="autocomplete-input"
                @input="handleInput"
                @focus="showDropdown = true"
                @keydown.down="moveSelection(1)"
                @keydown.up="moveSelection(-1)"
                @keydown.enter="selectItem"
                placeholder="Название продукта"
            />
            <input
                v-model="quantity"
                type="number"
                min="1"
                placeholder="Количество"
                class="w-24"
            />
        </div>

        <div v-if="showDropdown && filteredItems.length > 0" class="dropdown max-h-64 overflow-y-auto">
            <div
                v-for="(item, index) in filteredItems"
                :key="item.id"
                class="dropdown-item"
                :class="{ selected: index === selectedIndex }"
                @click="selectItem(item)"
                @mouseenter="selectedIndex = index"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
    <TextButtonLittle @click="addProduct()">Добавить продукт</TextButtonLittle>
</template>


