<script setup>
import { useRegistration } from '../stores/registration';
import { ref } from 'vue';
import TextButton from "./buttons/TextButton.vue";
import ForAuthForms from "./Inputs/ForAuthForms.vue";
import H1 from "./titles/H1.vue";

const form = ref({});
const useStore = useRegistration();
let status = ref(0);


function registerInApp(event) {
    event.preventDefault();
    if (!form.value.name || !form.value.email || !form.value.password) {
        return;
    }
    useStore.register(form.value.name, form.value.email, form.value.password);
    form.value = {};
    status = 1;
}

</script>

<template>
    <div class="flex flex-col pt-14 pb-14 pr-12 pl-12 border rounded-3xl bg-white">
        <H1 class="mb-7">Форма регистрации</H1>
        <form @submit="registerInApp" class="mb-2">
            <ForAuthForms class="mb-5" v-model="form.name" placeholder="Введите свое имя"></ForAuthForms>
            <ForAuthForms class="mb-5" type="email" v-model="form.email" placeholder="Введите свой Email"></ForAuthForms>
            <ForAuthForms class="mb-10" type="password" v-model="form.password" placeholder="Введите пароль"></ForAuthForms>

            <TextButton type="submit">Зарегистрироваться</TextButton>
        </form>
        <div v-if="status===1" class="w-80 items-center">
            <h4 class="text-emerald-800 font-semibold">
                Вы успешно зарегистрировались. Для входа в приложение нажмите кнопку
                <span class="text-amber-600">"Войти"</span>
                вверху формы
            </h4>
        </div>
    </div>
</template>

<style scoped>

</style>


