<script setup>

import { useEnter } from '../stores/enter';
import {ref, watch} from 'vue';
import TextButton from "./buttons/TextButton.vue";
import ForAuthForms from "./Inputs/ForAuthForms.vue";
import H1 from "./titles/H1.vue";
import {useRouter} from "vue-router";

const form = ref({});
const useStore = useEnter();
const router = useRouter()
let marker = ref(0);

watch(
    ()=>useStore.getToken,
    ()=>{
        if(useStore.getToken) {
            router.push({name: 'main'});
        }
    }
)
function enterInApp(event) {
    event.preventDefault();
    if (!form.value.email || !form.value.password) {
        return;
    }
    useStore.login(form.value.email, form.value.password);
    form.value = {};
}


</script>

<template>
    <div class="flex flex-col pt-14 pb-14 pr-12 pl-12 border rounded-3xl bg-white">
        <H1 class="mb-7">Форма входа</H1>
        <form @submit="enterInApp">
            <ForAuthForms class="mb-5" type="email" v-model="form.email" placeholder="Введите свой Email"></ForAuthForms>
            <ForAuthForms class="mb-10" type="password" v-model="form.password" placeholder="Введите пароль"></ForAuthForms>

            <TextButton type="submit">Войти</TextButton>
        </form>
    </div>

<!--    <div>{{ useStore.getToken }}</div>-->


</template>

<style scoped>

</style>
