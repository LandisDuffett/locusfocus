import { STATES } from 'mongoose'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    locuslist: {},
    studylists: [],
    studyitems: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLocuslist(state, locuslist) {
      state.locuslist = locuslist
    },
    setStudylists(state, studylists) {
      state.studylists = studylists
    },
    setStudyitems(state, studyitems) {
      state.studyitems = studyitems
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion

    //#region -- LOCUSLISTS --
    getLocuslist({ commit }) {
      api.get('locuslists').then(res => {
        commit('setLocuslist', res.data)
      })
    },
    addLocusitem({ commit, state }, data) {
      commit('setLocuslist', data)
    },
    addLocus({ commit, dispatch }, data) {
      api.post("locuslists/" + data.locusListId + "/items", data)
        .then(serverList => {
          dispatch('getLocuslist')
        })
    },
    async editLocuslist({ dispatch }, data) {
      try {
        let res = await api.put('locuslists/' + data.id, data).then(res => {
          dispatch('getLocuslist')
        })
      } catch (error) {
        console.error(error)
        alert("You may not edit another person's bug report.")
      }
    },
    //#endregion

    //#region -- STUDYLISTS --
    getStudylists({ commit }) {
      api.get('studylists')
        .then(res => {
          commit('setStudylists', res.data)
        })
    },
    addStudylist({ dispatch }, data) {
      api.post('boards', data)
        .then(serverStudylists => {
          dispatch('getStudylists')
        })
    },
    deleteStudylist({ dispatch }, id) {
      api.delete('studylists/' + id).then(serverStudylists => {
        //dispatch('deleteStudyitemsByList', id)
        dispatch('deleteStudyitemsByList', id)
      })
    },

    //#endregion

    //#region -- STUDYITEMS --
    getStudyitems({ commit }) {
      api.get('studyitems')
        .then(res => {
          commit('setStudyitems', res.data)
        })
    },
    addStudyitem({ dispatch }, data) {
      api.post('studyitems', data)
        .then(serverStudyitems => {
          dispatch('getStudyitems')
        })
    },
    deleteStudyitem({ dispatch }, id) {
      api.delete('studylists', id).then(serverStudyitems => {
        dispatch('getStudyitems')
      })
    },
    deleteStudyitemsByList({ dispatch }, id) {
      api.delete('studylists/' + id + '/studyitems').then(serverStudyitems => {
        dispatch('getStudylists')
      }).then(serverStudyitems => {
        dispatch('getStudyitems')
      })
    }
    //#endregion

  }
})
