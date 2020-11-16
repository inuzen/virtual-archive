import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'http://localhost:5000/api/';

export default new Vuex.Store({
    state: {
        shelves: [],
        folders: [],
        documents: [],
    },
    actions: {
        async loadShelves({ commit }) {
            try {
                const res = await Vue.axios.get('shelves/withFolders');
                console.log(res.data);

                commit('SET_SHELVES', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
    },
    mutations: {
        SET_SHELVES(state, shelves) {
            state.shelves = shelves;
        },
    },
    modules: {},
});
