import Vue from 'vue';
import Router from 'vue-router';
import Admin from '@/views/Admin.vue';
import Home from '@/views/Home.vue';
import List from '@/views/List.vue';
import Recipe from '@/views/Recipe.vue';
import EditRecipe from '@/views/EditRecipe.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/list',
      component: List,
    },
    {
      path: '/list/search/:value',
      component: List,
    },
    {
      path: '/list/category/:slug',
      component: List,
    },
    {
      path: 'recipe/new/edit',
      component: EditRecipe,
    },
    {
      path: '/recipe/:slug',
      component: Recipe,
    },
    {
      path: '/recipe/:slug/edit',
      component: EditRecipe,
    },
    {
      path: '/admin',
      component: Admin,
    },
    {
      path: '/admin/:action',
      component: Admin,
    },
  ],
});
