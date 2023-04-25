import { getUserInfo } from '@/api/requets'

const state = {
  userInfo: {}
}
const mutations = {
  getUserInfo(state, data) {
    state.userInfo = data
  }
}
const actions = {
  async getUserInfo({ commit }, { current, pageSize }) {
    const result = await getUserInfo(current, pageSize)
    if (result.code === 0) commit('getUserInfo', result.data)
    else {
      new Promise('Error')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

