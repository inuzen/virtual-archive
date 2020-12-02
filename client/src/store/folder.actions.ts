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
            commit('SET_FOLDERS', res.data);
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
    async getSubfolder({ commit }, folderId) {
        try {
            const res = await Vue.axios.get(`folders/folderFull/${folderId}`);
            commit('SET_CURRENT_SUBFOLDER', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async findFolder({ commit }, payload) {
        try {
            const res = await Vue.axios.post('folders/findFolder', payload);
            if (!res.data.folders.length) {
                commit('TOGGLE_ERROR');
            }
            commit('SET_HIGH_FOLDERS', res.data);
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
    async updateFolder({ commit }, { newFolder, currShelf, newShelf }) {
        try {
            const res = await Vue.axios.put(`folders/${newFolder.id}`, newFolder);
            if (res.status === 200) {
                commit('DELETE_FOLDER', { folderId: newFolder.id, shelf: currShelf });
                commit('ADD_FOLDER', { folder: newFolder, shelf: newShelf });
            }
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async updateSubfolder({ commit }, { newFolder }) {
        try {
            const res = await Vue.axios.put(`folders/${newFolder.id}`, newFolder);
            if (res.status === 200) {
                commit('UPDATE_SUBFOLDER', { newFolder });
            }
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
};
