<script setup>
    const data = defineModel();
    const { placeholder, type }   = defineProps({
        placeholder: String,
        type: String
    })
</script>

<template>
    <input class="w-full border rounded-full pt-2 pb-2 text-center text-gray-500" :type='type' :placeholder='placeholder' v-model="data">
</template>

<style scoped></style>


