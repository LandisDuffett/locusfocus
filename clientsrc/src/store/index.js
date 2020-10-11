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
    currentstudyitems: [],
    sessionlocuslist: [],
    sessionstudylist: [],
    sessionlists: [],
    activesessionlist: [],
    sessionIndex: 0,
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
    },
    setSessionlocus(state, sessionlocuslist) {
      state.sessionlocuslist = sessionlocuslist
    },
    setSessionstudy(state, sessionstudylist) {
      state.sessionstudylist = sessionstudylist
    },
    setSessionlists(state, sessionlists) {
      state.sessionlists = sessionlists
    },
    setActivesession(state, activesessionlist) {
      state.activesessionlist = activesessionlist
    },
    setSessionindex(state, index) {
      state.sessionIndex = index
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
        await api.put('studyitems/' + data.id, data)
        dispatch('getCurrentstudy', data.id)
      } catch (error) {
        console.error(error)
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
    },
    //#endregion

    //#region: session
    getSessionlists({ commit }) {
      api.get('sessionlists').then(res => {
        commit('setSessionlists', res.data)
      })
    },
    getActivesessionlist({ commit }, id) {
      api.get('sessionlists/' + id).then(res => {
        commit('setActivesession', res.data)
      })
    },
    setSeshlocuslist({ commit, state }, data) {
      let list = [...state.sessionlocuslist, ...data]
      commit('setSessionlocus', list)
    },
    setSeshstudylist({ commit, state }, data) {
      let list = [...state.sessionstudylist, ...data]
      commit('setSessionstudy', list)
    },
    clearSeshlocuslist({ commit, state }) {
      let list = []
      commit('setSessionlocus', list)
    },
    clearStudylist({ commit, state }) {
      let list = []
      commit('setSessionstudy', list)
    },
    createSessionlist({ dispatch, state }, list) {
      api.post('sessionlists', list).then(server => {
        dispatch('getSessionlists')
      })
    },
    advance({ commit, state }) {
      let ind = state.sessionIndex + 1;
      commit('setSessionindex', ind)
    },
    reset({ commit }) {
      commit('setSessionindex', 0)
    },
    deleteSession({ dispatch }, id) {
      api.delete('sessionlists/' + id).then(server => {
        dispatch('getSessionlists')
      })
    }
  }
})
