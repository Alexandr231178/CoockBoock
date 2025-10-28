<script setup>
import { useRegistration } from '../stores/registration';
import { ref } from 'vue';

const form = ref({});
const useStore = useRegistration();

function registerInApp(event) {
    event.preventDefault();
    if (!form.value.name || !form.value.email || !form.value.password) {
        return;
    };
    useStore.register(form.value.name, form.value.email, form.value.password);
    form.value = {};
}

</script>

<template>
    <form @submit="registerInApp">
        <input v-model="form.name" />
        <input type="email" v-model="form.email" />
        <input type="password" v-model="form.password" />
        <button type="submit">Зарегистрироваться</button>
    </form>
    <div>
        {{ useStore.newProfile.name }}
    </div>
</template>

<style scoped>

</style>
