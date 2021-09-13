import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: Home,
        meta: {
            title: 'U-Storage - Home'
        }
    },
    {
        name: "Register",
        component: Register,
        path: "/register",
        meta: {
            title: 'U-Storage - Registrarse'
        }
    },
    {
        name: "Login",
        component: Login,
        path: "/login",
        meta: {
            title: 'U-Storage - Login'
        }
    },
    {
        name: "Home",
        component: Home,
        path: "/home",
        meta: {
            title: 'U-Storage - Home'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})

export default router;