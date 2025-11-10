<script setup>

</script>

<template>
    <div class="flex justify-between pl-10 pt-4 pb-4 border border-gray-800 rounded-full bg-white">
        <RouterLink exact-active-class="active" to="/master" class="text-2xl text-gray-500 hover:text-amber-700 hover:font-semibold mr-10">Главная</RouterLink>
        <RouterLink exact-active-class="active" to="/master/sets" class="text-2xl text-gray-500 hover:text-amber-700 hover:font-semibold mr-10">Столы</RouterLink>
        <RouterLink exact-active-class="active" to="/master/dishes" class="text-2xl text-gray-500 hover:text-amber-700 hover:font-semibold mr-10">Блюда</RouterLink>
    </div>
</template>

<style scoped>
    .active {
        color: chocolate;
        font-weight: bold;
    }
</style>
