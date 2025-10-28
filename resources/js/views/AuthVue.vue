<script setup>
import EnterForm from '../components/EnterForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import { ref } from 'vue';

let authFormName = ref('Зарегистрироваться');
let authFormName2 = ref('Войти');

function changeAuthFormName() {
    if (authFormName.value === 'Зарегистрироваться') {
        authFormName.value = 'Войти';
        authFormName2.value = 'Зарегистрироваться'
    } else {authFormName.value = 'Зарегистрироваться';
        authFormName2.value = 'Войти'
    }

}

</script>

<template>
    <div v-if="authFormName === 'Зарегистрироваться'">
        <RegisterForm />
    </div>
    <div v-if="authFormName === 'Войти'">
        <EnterForm />
    </div>
    <div>
        <button @click="changeAuthFormName()">{{ authFormName2 }}</button>
    </div>
</template>

<style scoped>

</style>
