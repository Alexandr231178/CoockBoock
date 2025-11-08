<script setup>
import EnterForm from '../components/EnterForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import { ref } from 'vue';
import router from "../router/index.js";
import TextButtonLittle from "../components/buttons/TextButtonLittle.vue";
import Logo from "../components/menues/Logo.vue";


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

// function goToProducts() {
//     router.push('/products');
// }

</script>

<template>
    <div class="auth-vue">
        <div class="flex justify-between mb-1.5 items-center">
            <Logo />
            <div>
                <TextButtonLittle @click="changeAuthFormName()">{{ authFormName2 }}</TextButtonLittle>
            </div>

        </div>

        <div v-if="authFormName === 'Зарегистрироваться'">
            <RegisterForm />

        </div>

        <div v-if="authFormName === 'Войти'">
            <EnterForm />
        </div>
<!--        <div>-->
<!--            <TextButtonLittle @click="changeAuthFormName()">{{ authFormName2 }}</TextButtonLittle>-->
<!--        </div>-->

<!--        <div>-->
<!--            <TextButtonLittle @click="goToProducts()">Go to products</TextButtonLittle>-->
<!--        </div>-->
    </div>

</template>

<style scoped>

</style>
