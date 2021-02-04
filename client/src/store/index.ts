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
        documentFilter: null,
        folderFilter: null,
        shelfFilter: null,
        error: false,
    },
    actions: {
        async loadShelves({ commit }) {
            try {
                const res = await Vue.axios.get('shelves');
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
        setDocumentFilter({ commit }, filter) {
            commit('SET_DOC_FILTER', filter);
        },
        setFolderFilter({ commit }, filter) {
            commit('SET_FOLDER_FILTER', filter);
        },
        setShelfFilter({ commit }, filter) {
            commit('SET_SHELF_FILTER', filter);
        },
        toggleError({ commit }) {
            commit('TOGGLE_ERROR');
        },
    },
    mutations: {
        SET_SHELVES(state, shelves) {
            state.shelves = shelves;
        },
        SET_SHELVES_MAP(state, shelves) {
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
            // state.columnNames = names.sort();
            state.columnNames = ['НТЦ ПРОТЕЙ', 'ПРОТЕЙ СТ (АРХ)', 'ПРОТЕЙ (СЕРТ)'];
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
            state.currentFolder.Documents.push(newDoc);
            state.currentSubFolder.Documents.push(newDoc);
        },
        DELETE_DOCUMENT(state, docId) {
            state.currentFolder.Documents = state.currentFolder.Documents.filter((doc) => doc.id !== docId);
        },
        ADD_FOLDER(state, { folder, shelf }) {
            state.shelvesMap[shelf.name].find((s) => s.id == shelf.id).Folders.push(folder);
        },
        // UPDATE_FOLDER(state, { folder, currShelfId, newShelfId }) {
        //     if (currShelfId !== newShelfId.id) {
        //     }
        // },
        DELETE_FOLDER(state, { folderId, shelf }) {
            state.shelvesMap[shelf.name].find((s) => s.id == shelf.id).Folders = state.shelvesMap[shelf.name]
                .find((s) => s.id == shelf.id)
                .Folders.filter((fld) => fld.id !== folderId);
        },
        UPDATE_SUBFOLDER(state, newFolder) {
            // state.currentFolder.
        },
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
            state.highlightedFolders = payload.folders;
            state.highlightedShelfs = payload.shelves;
        },
        SET_HIGH_DOCS(state, payload) {
            state.highlightedDocuments = payload;
        },
        CLEAR_FILTERS(state) {
            state.documentFilter = null;
            state.folderFilter = null;
            state.shelfFilter = null;
            state.highlightedDocuments = [];
            state.highlightedFolders = [];
            state.highlightedShelfs = [];
        },
        SET_DOC_FILTER(state, filter) {
            state.documentFilter = filter;
        },
        SET_FOLDER_FILTER(state, filter) {
            state.folderFilter = filter;
        },
        SET_SHELF_FILTER(state, filter) {
            state.shelfFilter = filter;
        },
        FIND_DOCUMENT(state, payload) {
            state.highlightedDocuments = payload.documents;
            state.highlightedFolders = payload.folders;
            state.highlightedShelfs = payload.shelves;
        },
        TOGGLE_ERROR(state) {
            state.error = !state.error;
        },
    },
    modules: {},
});
