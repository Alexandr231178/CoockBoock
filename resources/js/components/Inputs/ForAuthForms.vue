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
               class="input-for-auth-form border rounded-full pt-3.5
               pb-3.5 text-gray-500">
    </div>

</template>

<style scoped>
    .input-for-auth-form {
        width: 370px;
        height: 50px;
        border: 1px solid #D8CFCF;
        padding-left: 30px;
        font-size: 20px;
    }
    .input-for-auth-form:focus {
        border: 2px solid #ff6200;
    }

</style>
