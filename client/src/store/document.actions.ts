import Vue from 'vue';

export const documentActions = {
    async getAllDocuments({ commit }) {
        try {
            const res = await Vue.axios.get(`documents`);
            commit('SET_DOCUMENTS', res.data);
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
    async getDocumentById({ commit }, documentId) {
        try {
            const res = await Vue.axios.get(`documents/${documentId}`);
            commit('SET_DOCUMENTS', res.data);
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
    async deleteDocument({ commit }, documentId) {
        try {
            const res = await Vue.axios.delete(`documents/${documentId}`);
            commit('DELETE_DOCUMENT', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
    async updateDocument({ commit }, document) {
        try {
            const res = await Vue.axios.put(`documents/${document.id}`, document);
            commit('UPDATE_DOCUMENT', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },

    async findDocument({ commit }, payload) {
        try {
            const res = await Vue.axios.post('documents/findDocument', payload);
            if (!res.data.documents.length) {
                commit('TOGGLE_ERROR');
            }
            commit('FIND_DOCUMENT', res.data);
        } catch (error) {
            throw new Error(`API ${error}`);
        }
    },
};
