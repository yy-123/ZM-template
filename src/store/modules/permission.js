import { constantRoutes } from '@/router'
// asyncRoutes
import store from 'vuex'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const menuList = store.getters.menuList
      traverse(constantRoutes, menuList)
      const newRoute = [{ path: '*', redirect: '/404', hidden: true }]
      commit('SET_ROUTES', newRoute)
      resolve(newRoute)
    })
  }
}

function traverse(constantRoutes, menuData) {
  for (const citem of constantRoutes) {
    for (const mitem of menuData) {
      if (citem.path === mitem.path) {
        citem.hidden = false
        if (citem.children && citem.children.length > 0) {
          traverse(citem.children, menuData)
        }
        break
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
