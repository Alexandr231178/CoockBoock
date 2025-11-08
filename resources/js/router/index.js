import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import EditProduct from '../components/EditProduct.vue';
import CreateProduct from '../components/CreateProduct.vue';
import AuthVue from '../views/AuthVue.vue';
import UsersAll from '../views/UsersAll.vue';
import {useEnter} from '../stores/enter.js';
import MasterPage from "../views/MasterPage.vue";



const routes = [
    {
        path: '/',
        component: AuthVue, name: 'auth'
    },

    {
        path: '/master',
        component: MasterPage
    },

    {
        path: '/users', component: UsersAll, name: 'All',
    },

    {
        path: '/products',
        component: ProductList,
    },
    {
        path: '/products/create',
        component: CreateProduct,
    },
    {
        path: '/products/:id/edit',
        component: EditProduct,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to)=>{
    const enterStore = useEnter();
    if(!enterStore.getToken && to.name !== 'auth') {
        return { name: 'auth'};
    }
});



export default router
