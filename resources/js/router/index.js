import { createRouter, createWebHistory } from 'vue-router';
import AuthVue from '../views/AuthVue.vue';
import {useEnter} from '../stores/enter.js';
import MasterPage from "../views/MasterPage.vue";
import SetePages from "../views/SetePages.vue";
import DishPages from "../views/DishPages.vue";
import MainVue from "../views/MainVue.vue";
import ResultList from "../components/outputs/ResultList.vue";
import ResultList2 from "../components/outputs/ResultList2.vue";



const routes = [
    {
        path: '/',
        component: AuthVue, name: 'auth'
    },

    {
        path: '/master',
        component: MasterPage, name: 'master',
        children: [
            {
                path: '',
                component: MainVue, name: 'main',
            },
            {
                path: 'sets',
                component: SetePages, name: 'sets'
            },

            {
                path: 'dishes',
                component: DishPages, name: 'dishes'
            },

            {
                path: 'result',
                component: ResultList, name: 'result'
            },

            {
                path: 'result2',
                component: ResultList2, name: 'result2'
            }


        ]
    },








    // {
    //     path: '/users', component: UsersAll, name: 'All',
    // },
    //
    // {
    //     path: '/products',
    //     component: ProductList,
    // },
    // {
    //     path: '/products/create',
    //     component: CreateProduct,
    // },
    // {
    //     path: '/products/:id/edit',
    //     component: EditProduct,
    // },
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
