<script setup>
import axios from "axios";
import { ref } from 'vue';
import { useEnter } from '../stores/enter';

const useStore = useEnter();
const users = ref({});

async function getUsers() {
    const { data } = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
            Authorization: `Bearer ${useStore.getToken}`,
        }
    });
    users.value = data;
}

</script>

<template>
    <div>
        <ul v-for="value in users">
            <li>{{ value.name }} - {{ value.email }}</li>
        </ul>

    </div>
    <div>
        <button @click="getUsers">Получить пользователей</button>
    </div>
</template>

<style scoped>

</style>
