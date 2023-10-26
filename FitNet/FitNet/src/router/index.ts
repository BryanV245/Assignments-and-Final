import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import LoginView from '../views/LoginView.vue'
import { getSession } from '@/model/session';



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
    },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/MyProfile",
      name: "My Profile",
      component: () => import("../views/MyProfile.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/Admin",
      name: "Admin",
      component: () => import("../views/Admin.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/Social",
      name: "Social",
      component: () => import("../views/Social.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/Plan",
      name: "Plan",
      component: () => import("../views/PlanView.vue"),
      beforeEnter: requireLogin,
    },
  ],
});

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router
