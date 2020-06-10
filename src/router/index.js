import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Create from '../views/employee/Create';
import Edit from '../views/employee/Edit';
import Show from '../views/employee/Show';
import PageNotFound from '../views/PageNotFound'
import Login from '../views/Login'
import Register from '../views/Register';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'home',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },

  {
    path: '/employee/create',
    name: 'employee.create',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/employee/:id/edit',
    name: 'employee.edit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/employee/:id',
    name: 'employee.show',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/404',
    name: 'notfound',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  routes,
});


router.beforeEach((to, from, next) =>
{

  //check if the targer route requres auth or not
  if (to.matched.some((route) => route.meta.requiresAuth))
  {
    //check if the current session is  not authenticated in case is not redirect to login page
    (!localStorage.getItem('auth')) ? next({ name: 'login', query: { redirect: to.fullPath } }) : next();

    //check if the targer route requires guest or not
  } else if (to.matched.some((route) => route.meta.requiresGuest))
  {
    //check if the current session is authenticated in case it is redirect to dashbaord page
    (localStorage.getItem('auth')) ? next({ name: 'home', query: { redirect: to.fullPath } }) : next();

  } else
  {

    next();
  }

});



export default router
