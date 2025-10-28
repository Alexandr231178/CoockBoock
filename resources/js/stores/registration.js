import axios from "axios";
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useRegistration = defineStore('registration', ()=>{

    const newProfile = ref({})

    async function register(name, email, password) {
        const  {data}  = await axios.post('http://127.0.0.1:8000/api/register', {
            "name": name,
            "email": email,
            "password": password,
        });
        newProfile.value = data;
    }



    return { newProfile, register }
});
