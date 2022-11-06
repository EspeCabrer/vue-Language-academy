import { createRouter, createWebHistory} from 'vue-router';
import LoginForm from '../views/LoginForm.vue'

const routes = [
    {
        path: '/',
        name: "Login",
        component: LoginForm
    }
]