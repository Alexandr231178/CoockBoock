import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

const TOKEN_STORE_KEY = 'token-store'; //Создаем ключь для заголовка в котором будет храниться токен

export const useEnter = defineStore('enter', ()=>{
    const profile = ref({}) // В нашем случае приходит вся инфа пользователя, а не только токен
    let token = ref(profile.value.token); //Вычленяем токен

    const initialValue = localStorage.getItem(TOKEN_STORE_KEY); //Пока не совсем понятно нафига оно, но надо

    if (initialValue) {
        token.value = initialValue; //Если уже имеется токен, то при перезагрузке присваиваем старое значение обнулившейся переменной
    }

    function setToken(newToken) {
        token.value = newToken;
        localStorage.setItem(TOKEN_STORE_KEY, newToken)
    }

    function clearToken() {
        token.value = undefined;
        localStorage.removeItem(TOKEN_STORE_KEY);
    }

    const getToken = computed(()=> {
        return token.value
    })

    async function login(email, password) {
        const  {data}  = await axios.post('http://127.0.0.1:8000/api/login', {
            "email": email,
            "password": password,
        });

        setToken(data.token);
    }





    return { getToken, login, setToken, clearToken }
});
