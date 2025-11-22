<script setup>
    const data = defineModel();
    const { placeholder, type }   = defineProps({
        placeholder: String,
        type: String
    })

</script>

<template>
    <div>
        <input :type='type' :placeholder='placeholder' v-model="data"
               class="border rounded-full pt-3.5
               pb-3.5 text-gray-500">
    </div>

</template>

<style scoped>


</style>
