<template>
    <div class="folder-modal-wrapper">
        <div class="close-modal" @click="closeFolderModal">
            <div class="img-wrapper">
                <img src="../assets/icons/black-cross.svg" alt="" />
            </div>
        </div>
        <div class="folder-title-container">
            <div class="folder-title-wrapper highlight">
                <div class="year">{{ fullFolder.year }}</div>
                <div v-if="!folderEditMode" class="name">
                    {{ fullFolder.name }}
                </div>
                <div v-if="!folderEditMode" class="number">
                    {{ fullFolder.number }}
                </div>
                <div v-if="!folderEditMode" class="doc-type">
                    {{ fullFolder.doc_type }}
                </div>

                <div v-if="folderEditMode" class="name">
                    <TextInput @input="(val) => onInputChange(val, 'name')" :value="fullFolder.name" />
                </div>
                <div v-if="folderEditMode" class="number">
                    <TextInput @input="(val) => onInputChange(val, 'number')" :value="fullFolder.number" />
                </div>
                <div v-if="folderEditMode" class="doc_type">
                    <TextInput @input="(val) => onInputChange(val, 'doc_type')" :value="fullFolder.doc_type" />
                </div>
            </div>
            <div class="edit-button-container" @click="editModeOn" v-if="!folderEditMode">
                <div class="img-wrapper">
                    <img src="../assets/icons/edit-icon.svg" alt="" />
                </div>
            </div>
        </div>
        <div v-if="folderEditMode" class="folder-edit-container">
            <div class="folder-actions-row">
                <div v-if="markForDelete" class="message-container">
                    Удаление папки вступит в силу после сохранения изменений, все данные в этой папке будут потеряны
                </div>
            </div>
            <div class="button-row">
                <button @click="onClose" class="btn slim secondary">Отменить</button>
                <button @click="onClickSave" class="btn slim primary">Сохранить</button>
                <button @click="onDeleteFolder" class="btn slim danger delete-btn" :disabled="markForDelete">
                    Удалить
                </button>
            </div>
        </div>
        <button @click="onShowDocumentModal" class="btn primary">
            Добавить документ
        </button>
        <div class="document-list-container">
            <span class="document-list__label">Всего документов в папке: {{fullFolder.Documents.length}}</span>
            <div class="header">
                <span>Инв №</span>
                <span>Обозначение</span>
                <span>Документ</span>
                <span>Тип документа</span>
                <span>Стикер</span>
            </div>
            <div v-if="foundDocuments.length" class="document-list search-result">
                <span class="document-list__label">Найдено документов: {{foundDocuments.length}}</span>
                <Document v-for="doc in foundDocuments" :key="doc.id" :document="doc" />
            </div>
            <div class="document-list">
                <span class="document-list__label" v-if="foundDocuments.length">Все документы:</span>
                <Document v-for="doc in fullFolder.Documents" :key="doc.id" :document="doc" />
            </div>
        </div>
        <md-dialog :md-active.sync="showAddFolderModal">
            <FolderModal :isSubfolder="true" :parentFolderId="fullFolder.id" @closeFolderModal="closeAddFolderModal" />
        </md-dialog>
        <md-dialog :md-active.sync="showDocumentModal">
            <DocumentModal :folderId="fullFolder.id" :folderName="fullFolder.name" @closeDocModal="closeDocModal" />
        </md-dialog>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import Document from '@/components/Document.vue';
    import Folder from '@/components/Folder.vue';
    import TextInput from '@/components/TextInput.vue';
    import DocumentModal from '@/components/dialogs/DocumentModal.vue';
    import FolderModal from '@/components/dialogs/FolderModal.vue';
    import ShelfFilter from '@/components/filters/ShelfFilter.vue';
    import { State, Action } from 'vuex-class';

    @Component({
        components: {
            Folder,
            Document,
            DocumentModal,
            TextInput,
            ShelfFilter,
            FolderModal,
        },
    })
    export default class ViewSubfolder extends Vue {
        @State currentSubfolderId;
        @State currentSubfolder;
        @State currentShelf;
        @State shelves;
        @State highlightedDocuments;
        @Action getDocumentsByFolder;
        @Action getSubfolder;
        @Action toggleSubfolderView;
        @Action updateSubFolder;
        @Action deleteFolder;

        public folderEditMode = false;
        public showDocumentModal = false;
        public showAddFolderModal = false;
        public markForDelete = false;
        public foundDocuments = [];
        public fullFolder = {};

        async created() {
            if (this.currentSubfolderId) {
                await this.getSubfolder(this.currentSubfolderId);
                this.fullFolder = this.currentSubfolder;
                this.foundDocuments = this.currentSubfolder.Documents.filter((doc)=>
                    this.highlightedDocuments.includes(doc.id),
                );
            }
                    }
              
        public onInputChange(value, inputName) {
            this.fullFolder[inputName] = value;
        }
        public closeDocModal() {
            this.showDocumentModal = false;
        }
        public onShowDocumentModal() {
            this.showDocumentModal = true;
        }

        public editModeOn() {
            this.folderEditMode = true;
        }
        public editModeOff() {
            this.folderEditMode = false;
        }

        public toggle() {
            this.folderEditMode = !this.folderEditMode;
        }

        public onClickSave() {
            if (this.markForDelete) {
                this.deleteFolder({ folderId: this.currentSubfolderId, currShelf: this.currentShelf });
            } else {
                this.updateSubFolder({
                    newFolder: {
                        ...this.fullFolder,
                    },
                });
            }
            this.editModeOff();
        }
        public onClose() {
            this.folderEditMode = false;
            this.markForDelete = false;
        }
        public onDeleteFolder() {
            this.markForDelete = true;
        }

        public closeFolderModal() {
            this.toggleSubfolderView();
        }
    }
</script>

<style lang="scss">
    @import '../styles/folderview.styles.scss';
</style>
