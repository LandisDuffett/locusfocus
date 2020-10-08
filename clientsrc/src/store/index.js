import { STATES } from 'mongoose'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    loci: [],
    studylists: [],
    studyitems: [],
    currentstudyitems: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoci(state, loci) {
      state.loci = loci
    },
    setStudylists(state, studylists) {
      state.studylists = studylists
    },
    setStudyitems(state, studyitems) {
      state.studyitems = studyitems
    },
    setCurrentStudyitems(state, currentstudyitems) {
      state.currentstudyitems = currentstudyitems
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

    //#region -- LOCI --
    getLoci({ commit }) {
      api.get('loci').then(res => {
        commit('setLoci', res.data)
      })
    },
    addLocus({ dispatch }, data) {
      api.post("loci", data)
        .then(server => {
          dispatch('getLoci')
        })
    },
    async editLocus({ dispatch }, data) {
      try {
        let res = await api.put('loci/' + data.id, data).then(res => {
          dispatch('getLoci')
        })
      } catch (error) {
        console.error(error)
        alert("You may not edit another person's loci.")
      }
    },
    deleteLocus({ dispatch }, id) {
      api.delete('loci/' + id).then(server => {
        dispatch('getLoci')
      })
    },
    clearLocuslist({ dispatch }) {
      api.delete('loci').then(server => {
        dispatch('getLoci')
      })
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
      api.post('studylists', data)
        .then(server => {
          dispatch('getStudylists')
        })
    },
    deleteStudylist({ dispatch }, id) {
      api.delete('studylists/' + id).then(server => {
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
    async getCurrentstudy({ commit }, id) {
      try {
        let res = await api.get('studylists/' + id + '/studyitems')
        commit("setCurrentStudyitems", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    addStudyitem({ dispatch }, data) {
      api.post('studyitems', data)
        .then(server => {
          dispatch('getCurrentstudy', data.studyListId)
        })
    },

    async editStudy({ dispatch }, data) {
      try {
        let res = await api.put('studyitems/' + data.id, data).then(res => {
          dispatch('getCurrentstudy', data.id)
        })
      } catch (error) {
        console.error(error)
        alert("You may not edit another person's loci.")
      }
    },

    deleteStudy({ dispatch }, data) {
      api.delete('studyitems/' + data.id).then(server => {
        dispatch('getCurrentstudy', data.studyListId)
      })
    },
    deleteStudyitemsByList({ dispatch }, id) {
      api.delete('studylists/' + id + '/studyitems').then(server => {
        dispatch('getStudylists')
      }).then(serverStudyitems => {
        dispatch('getCurrentstudy')
      })
    }
    //#endregion

  }
})
