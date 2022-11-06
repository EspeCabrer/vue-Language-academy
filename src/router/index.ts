import { createRouter, createWebHistory} from 'vue-router';
import Login from '../views/LogIn.vue'
import Signin from '../views/SignIn.vue'
import Teachers from '../views/teacherList.vue'

const routes = [
    {
        path: '/',
        name: "login",
        component: Login
    },
    {
        path: '/signin',
        name: "signin",
        component: Signin
    },
    {
        path: '/teachers',
        name: "teachers",
        component: Teachers
    }

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

export default router;
