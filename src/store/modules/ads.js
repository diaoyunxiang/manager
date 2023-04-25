import { getAllPicture } from '@/api/requets'

const actions = {

  async getAll({ commit }) {
    const result = await getAllPicture()

    if (result.code === 0) {
      result.data.forEach(element => {
        var binary = ''
        var bytes = new Uint8Array(element.file.data)
        var len = bytes.byteLength
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        element.file.data = 'data:undefined;base64,' + window.btoa(binary)
      })

      commit('getall', result.data)
    }
  }
}
const mutations = {
  getall(state, data) {
    state.ads = data
  }
}
const state = {
  ads: {}
}
export default {
  namespaced: true,
  actions,
  mutations,
  state
}
