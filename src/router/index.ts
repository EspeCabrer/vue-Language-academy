import { createRouter, createWebHistory} from 'vue-router';
import Login from '../views/LogIn.vue'
import Signin from '../views/SignIn.vue'
import Students from '../views/Students.vue'

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
        path: '/students',
        name: "Students",
        component: Students
    }

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

export default router;
