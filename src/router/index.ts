import Cookies from 'js-cookie';
import { createRouter, createWebHistory, Router} from 'vue-router';
import Login from '../views/LogIn.vue'
import Signin from '../views/SignIn.vue'
import Students from '../views/Students.vue'
import StudentInfo from '../views/StudentInfo.vue'

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
    },
    {
        path: '/student/:id',
        name: 'studentPage',
        component: StudentInfo
    }
]

export const router: Router  = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const publicPages: String[] = ['/', '/signin'];
  const authRequired: boolean = !publicPages.includes(to.path);
    const loggedIn: String | undefined = Cookies.get('jwt');

  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
