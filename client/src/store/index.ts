import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'http://localhost:5000/api/';

export default new Vuex.Store({
    state: <any>{
        shelves: [],
        shelvesMap: null,
        columnNames: [],
        folders: [],
        documents: [],
        currentShelf: null,
        currentFolder: null,
        currentDocument: null,
    },
    actions: {
        async loadShelves({ commit }) {
            try {
                const res = await Vue.axios.get('shelves/withFolders');
                commit('SET_SHELVES', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async loadShelvesWithFolders({ commit }) {
            try {
                const res = await Vue.axios.get('shelves/withFolders');
                commit('SET_SHELVES_MAP', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async getDocumentsByFolder({ commit }, folderId) {
            try {
                const res = await Vue.axios.get(`documents/byFolder/${folderId}`);
                commit('SET_DOCUMENTS', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async addFolder({ commit }, payload) {
            try {
                const res = await Vue.axios.post('folders', payload);
                commit('ADD_FOLDER', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async addDocument({ commit }, payload) {
            try {
                const res = await Vue.axios.post('documents', payload);
                commit('ADD_DOCUMENT', res.data.document);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async findDocument({ commit }, payload) {
            try {
                const res = await Vue.axios.post('documents/findDocument', payload);
                commit('FIND_DOCUMENT', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async findFolder({ commit }, payload) {
            try {
                const res = await Vue.axios.post('folders/findFolder', payload);
                commit('FIND_FOLDER', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },
        async findShelf({ commit }, payload) {
            try {
                const res = await Vue.axios.post('shelves/findShelf', payload);
                commit('FIND_SHELF', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },

        //local state actions
        setCurrentShelf({ commit }, shelf) {
            commit('SET_CURRENT_SHELF', shelf);
        },
        setCurrentFolder({ commit }, folder) {
            commit('SET_CURRENT_FOLDER', folder);
        },
        setCurrentDocument({ commit }, document) {
            commit('SET_CURRENT_DOCUMENT', document);
        },
    },
    mutations: {
        SET_SHELVES(state, shelves) {
            state.shelves = shelves;
        },
        SET_SHELVES_MAP(state, shelves) {
            // state.shelves = shelves;
            let names: any[] = [];
            let shelvesObj = {};

            shelves.forEach((current) => {
                if (!shelvesObj[current.name]) {
                    shelvesObj[current.name] = [current];
                    names.push(current.name);
                } else {
                    shelvesObj[current.name].push(current);
                }
            });
            state.shelvesMap = shelvesObj;
            state.columnNames = names;
        },

        SET_DOCUMENTS(state, docs) {
            state.documents = docs;
        },
        SET_CURRENT_SHELF(state, shelf) {
            state.currentShelf = shelf;
        },
        SET_CURRENT_FOLDER(state, folder) {
            state.currentFolder = folder;
        },
        SET_CURRENT_DOCUMENT(state, document) {
            state.currentDocument = document;
        },

        ADD_DOCUMENT(state, newDoc) {
            console.log(newDoc);

            state.documents.push(newDoc);
        },
    },
    modules: {},
});
