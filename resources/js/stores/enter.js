import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

const TOKEN_STORE_KEY = 'token-store'; //Создаем ключ для заголовка в котором будет храниться токен
const USER_DATA = 'user-data';


export const useEnter = defineStore('enter', ()=>{
    const profile = ref({}) // В нашем случае приходит вся инфа пользователя, а не только токен
    let token = ref(profile.value.token); //Вычленяем токен

    const initialValue = localStorage.getItem(TOKEN_STORE_KEY); //Пока не совсем понятно нафига оно, но надо

    if (initialValue) {
        token.value = initialValue; //Если уже имеется токен, то при перезагрузке присваиваем старое значение обнулившейся переменной
    }

    let userData = ref(profile.value.name);
    const initialValueUserData = localStorage.getItem(USER_DATA);
    if(initialValueUserData) {
        userData.value = initialValueUserData;
    }


    function setToken(newToken, newUserName) {
        token.value = newToken;
        localStorage.setItem(TOKEN_STORE_KEY, newToken);
        localStorage.setItem(USER_DATA, newUserName);

    }


    function clearToken() {
        token.value = undefined;
        localStorage.removeItem(TOKEN_STORE_KEY);
        localStorage.removeItem(USER_DATA);
    }

    const getToken = computed(()=> {
        return token.value
    })



    async function login(email, password) {
        const {data}  = await axios.post('http://127.0.0.1:8000/api/login', {
            "email": email,
            "password": password,
        });

        setToken(data.token, data[0].name);
        userData.value = data[0].name;
    }


    return { getToken, userData, login, setToken, clearToken }
});





