import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = 'https://localhost:7297/ApiLimiteAgua'

export default new Vuex.Store({
  state: {
    dadosLimiteAgua: [{
      dataColeta: Date,
      local: String,
      altura: Float64Array
    }],
    dadosLimiteAguaSemana: [{
      dataColeta: Date,
      local: String,
      altura: Float64Array
    }]
  },
  getters: {
  },
  mutations: {
      UPDATE_LIMITE_AGUA_DIA(state, payload){
        state.dadosLimiteAgua = JSON.parse(payload)
      },
      UPDATE_LIMITE_AGUA_SEMANA(state, payload){
        state.dadosLimiteAguaSemana = JSON.parse(payload)
      }
  },
  actions: {

    async getDadosLimiteAguaDia() {
      await axios.get(
        `${url}/GetLimiteAguaDia`,
      ).then(response => {
        this.commit('UPDATE_LIMITE_AGUA_DIA', response.data.data)     
      }, (error) => {
        console.log(error);
      });
    },

    async getDadosLimiteAguaSemana() {
      await axios.get(
        `${url}/GetLimiteAguaSemana`,
      ).then(response => {
        this.commit('UPDATE_LIMITE_AGUA_SEMANA', response.data.data)     
      }, (error) => {
        console.log(error);
      });
    },

    async getUltimaAtualizacao(context, payload) {
      console.log('teste')
      //this.commit('UPDATE_ULTIMO_LIMITE_AGUA', data)     
    },
  },
  modules: {
  }
})
