<script setup>
    import {useEnter} from "../../stores/enter.js";
    import {useRouter} from "vue-router";
    import TextButtonLittle from "../buttons/TextButtonLittle.vue";
    const useStore = useEnter()
    const router = useRouter()
    //console.log(useStore.userData.name)

    function logout() {
        useStore.clearToken();
        router.push({name: 'auth'})
    }

</script>

<template>
    <div class="flex justify-between pl-10 pr-10 pt-4 pb-4 border border-gray-800 rounded-full bg-white">
        <h3 class="text-2xl font-semibold mr-8 text-gray-500 hover:text-amber-700">{{ useStore.userData.name }}</h3>
        <TextButtonLittle @click="logout">Выйти</TextButtonLittle>
    </div>
</template>

<style scoped>

</style>
