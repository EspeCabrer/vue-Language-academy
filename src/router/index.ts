import Cookies from 'js-cookie';
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/signin'];
  const authRequired = !publicPages.includes(to.path);
    const loggedIn = Cookies.get('jwt');

  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
