import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { documentActions } from './document.actions';
import { folderActions } from './folder.actions';
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
        currentFolderId: null,
        currentSubfolderId: null,
        currentSubfolder: null,
        showFolderView: false,
        showSubfolderView: false,
        currentDocument: null,
        highlightedShelfs: [],
        highlightedFolders: [],
        highlightedDocuments: [],
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
        async findShelf({ commit }, payload) {
            try {
                const res = await Vue.axios.post('shelves/findShelf', payload);
                commit('FIND_SHELF', res.data);
            } catch (error) {
                throw new Error(`API ${error}`);
            }
        },

        ...documentActions,
        ...folderActions,

        //local state actions
        setCurrentShelf({ commit }, shelf) {
            commit('SET_CURRENT_SHELF', shelf);
        },
        setCurrentFolder({ commit }, folder) {
            commit('SET_CURRENT_FOLDER', folder);
        },
        setCurrentSubfolder({ commit }, subfolder) {
            commit('SET_CURRENT_SUBFOLDER', subfolder);
        },
        setCurrentFolderId({ commit }, folderId) {
            commit('SET_CURRENT_FOLDER_ID', folderId);
        },
        setCurrentSubfolderId({ commit }, subfolderId) {
            commit('SET_CURRENT_SUBFOLDER_ID', subfolderId);
        },
        setCurrentDocument({ commit }, document) {
            commit('SET_CURRENT_DOCUMENT', document);
        },
        toggleFolderView({ commit }) {
            commit('TOGGLE_FOLDER');
        },
        toggleSubfolderView({ commit }) {
            commit('TOGGLE_SUBFOLDER');
        },
        setHighlightedShelfs({ commit }, shelfIdArr) {
            commit('SET_HIGH_SHELFS', shelfIdArr);
        },
        setHighlightedFolders({ commit }, folderIdArr) {
            commit('SET_HIGH_FOLDERS', folderIdArr);
        },
        setHighlightedDocuments({ commit }, docIdArr) {
            commit('SET_HIGH_DOCS', docIdArr);
        },
        clearFilters({ commit }) {
            commit('CLEAR_FILTERS');
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
        SET_CURRENT_SUBFOLDER(state, folder) {
            state.currentSubfolder = folder;
        },
        SET_CURRENT_FOLDER_ID(state, folderId) {
            state.currentFolderId = folderId;
        },
        SET_CURRENT_SUBFOLDER_ID(state, subfolderId) {
            state.currentSubfolderId = subfolderId;
        },
        SET_CURRENT_DOCUMENT(state, document) {
            state.currentDocument = document;
        },
        ADD_DOCUMENT(state, newDoc) {
            state.documents.push(newDoc);
        },
        ADD_FOLDER(state, { folder, shelf }) {
            state.shelvesMap[shelf.name].find((s) => s.number === shelf.number).Folders.push(folder);
        },
        // FIND_FOLDER(state, res) {
        //     state.high
        // },
        TOGGLE_FOLDER(state) {
            state.showFolderView = !state.showFolderView;
        },
        TOGGLE_SUBFOLDER(state) {
            state.showSubfolderView = !state.showSubfolderView;
        },
        SET_HIGH_SHELFS(state, payload) {
            state.highlightedShelfs = payload;
        },
        SET_HIGH_FOLDERS(state, payload) {
            state.highlightedFolders = payload;
        },
        SET_HIGH_DOCS(state, payload) {
            state.highlightedDocuments = payload;
        },
        CLEAR_FILTERS(state){
            state.highlightedDocuments = [];
            state.highlightedFolders = [];
            state.highlightedShelfs = [];
        }
           
    },
    modules: {},
});
