<script setup>
import EnterForm from '../components/EnterForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import { ref } from 'vue';
import router from "../router/index.js";
import TextButton from "../components/buttons/TextButton.vue";


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

function goToProducts() {
    router.push('/products');
}

</script>

<template>
    <div class="auth-vue">
        <div v-if="authFormName === 'Зарегистрироваться'">
            <RegisterForm />
        </div>
        <div v-if="authFormName === 'Войти'">
            <EnterForm />
        </div>
        <div>
            <TextButton @click="changeAuthFormName()">{{ authFormName2 }}</TextButton>
        </div>

        <div>
<!--            <button @click="goToProducts()">Go to products</button>-->
            <TextButton @click="goToProducts()">Go to products</TextButton>
        </div>
    </div>

</template>

<style scoped>
    .auth-vue {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        background-color: white;
    }

</style>
