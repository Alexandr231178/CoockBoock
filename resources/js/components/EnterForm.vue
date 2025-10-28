<script setup>

import router from '../router';
import { useEnter } from '../stores/enter';
import { ref } from 'vue';

const form = ref({});
const useStore = useEnter();


function enterInApp(event) {
    event.preventDefault();
    if (!form.value.email || !form.value.password) {
        return;
    };
    useStore.login(form.value.email, form.value.password);
    form.value = {};
}

function logout() {
    useStore.clearToken()
}

function goToUsers(){
    router.push('/users');
}

</script>

<template>
    <form @submit="enterInApp">
        <input type="email" v-model="form.email" />
        <input type="password" v-model="form.password" />
        <button type="submit">Войти</button>
    </form>
    <div>{{ useStore.getToken }}</div>
    <button @click="goToUsers">Go to users page</button>
    <button @click="logout">Logout</button>
</template>

<style scoped>

</style>
