import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import { isNil } from 'lodash'
import store from '@/store'
import Onboarding from "@/views/Onboarding/Onboarding";

Vue.use(Router);

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE
});

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "client-chunk-login" */ '@/views/Login.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () =>
        import(/* webpackChunkName: "client-chunk-projects" */ '@/views/Projects/Projects.vue')
    },
    {
      path: '/invitation/:id',
      name: 'invitation',
      component: () =>
          import(/* webpackChunkName: "client-chunk-invitation" */ '@/views/Invitation/Invitation.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/projects/:id',
      name: 'project',
      props: true,
      component: () =>
          import(/* webpackChunkName: "client-chunk-project" */ '@/views/Projects/Project.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'project-dashboard',
          props: true,
          component: () =>
              import(/* webpackChunkName: "client-chunk-project-dashboard" */ '@/views/Projects/Dashboard.vue')
        },
        {
          path: 'invitation',
          name: 'project-invitation',
          props: true,
          component: () =>
              import(/* webpackChunkName: "client-chunk-project-invitation" */ '@/views/Projects/ProjectInvitation.vue')
        },
        {
          path: 'members',
          name: 'project-members',
          props: true,
          component: () =>
              import(/* webpackChunkName: "client-chunk-project-members" */ '@/views/Projects/ProjectMembers.vue')
        }
      ]
    },
    { path: '*', redirect: '/home' }
  ]
});

/**
 * Handle user redirections
 */
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login';
    return next(`${path}?redirectUrl=${to.path}`)
  }
  next()
});

export default router
