import Vue from 'vue';

export const folderActions = {
    async getAllFolders({ commit }) {
        try {
            const res = await Vue.axios.post('folders');
            commit('SET_FOLDERS', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async getFolderById({ commit }, folderId) {
        try {
            const res = await Vue.axios.get(`folders/${folderId}`);
            commit('SET_DOCUMENTS', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async getFolderFull({ commit }, folderId) {
        try {
            const res = await Vue.axios.get(`folders/folderFull/${folderId}`);
            commit('SET_CURRENT_FOLDER', res.data);
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
    async addFolder({ commit }, payload) {
        try {
            const res = await Vue.axios.post('folders', payload.folder);
            commit('ADD_FOLDER', { folder: res.data.folder, shelf: payload.shelf });
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async deleteFolder({ commit }, folderId) {
        try {
            const res = await Vue.axios.delete(`folders/${folderId}`);
            commit('DELETE_FOLDER', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async updateFolder({ commit }, folder) {
        try {
            const res = await Vue.axios.put(`folders/${folder.id}`, folder);
            commit('DELETE_FOLDER', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
};
