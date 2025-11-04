<script setup>

import router from '../router';
import { useEnter } from '../stores/enter';
import { ref } from 'vue';
import TextButton from "./buttons/TextButton.vue";

const form = ref({});
const useStore = useEnter();
const statusUser =  ref((useStore.getToken) ? 'Зарегистрированный пользователь' : 'Незарегистрированный пользователь');


function enterInApp(event) {
    event.preventDefault();
    if (!form.value.email || !form.value.password) {
        return;
    }

    useStore.login(form.value.email, form.value.password);
    form.value = {};
}

function logout() {
    useStore.clearToken()
}



</script>

<template>
    <form @submit="enterInApp" class="enter-form">
        <input type="email" v-model="form.email" />
        <input type="password" v-model="form.password" />
        <TextButton type="submit">Войти</TextButton>
    </form>
    <div>{{ statusUser }}</div>
    <div>
        <TextButton @click="logout">Выйти</TextButton>
    </div>

</template>

<style scoped>
    .enter-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: bisque;
    }
</style>
