import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import $http from '@/utils/request'

const state = {
  token: getToken(),
  userBean: {}, // 用户信息
  menuList: [], // 左侧权限菜单,
  codeMap: {} // codeMap
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USETBEAN: (state, userBean) => {
    state.userBean = userBean
  },
  SET_MENULIST: (state, menuList) => {
    state.menuList = menuList
  },
  SET_CODEMAP: (state, codeMap) => {
    state.codeMap = codeMap
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      $http.get('/token', { params: userInfo }).then(res => {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve()
      })
    })
  },

  // get user info 设置用户信息 权限表 codeMap
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      $http.post('service', { cmd: 's0001' }).then(res => {
        if (!res) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USETBEAN', res.userBean)
        commit('SET_MENULIST', res.menuList)
        commit('SET_CODEMAP', res.codeMap)
        resolve(res)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

