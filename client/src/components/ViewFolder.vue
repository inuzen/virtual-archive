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
                <div v-if="folderEditMode" class="name">
                    <TextInput @input="(val) => onInputChange(val, 'name')" :value="fullFolder.name" />
                </div>
                <div v-if="folderEditMode" class="number">
                    <TextInput @input="(val) => onInputChange(val, 'number')" :value="fullFolder.number" />
                </div>
            </div>
            <div class="edit-button-container" @click="editModeOn" v-if="!folderEditMode">
                <div class="img-wrapper">
                    <img src="../assets/icons/edit-icon.svg" alt="" />
                </div>
            </div>
        </div>
        <div v-if="folderEditMode" class="folder-edit-container">
            <p class="label">Переместить в</p>
            <div class="folder-actions-row">
                <ShelfFilter
                    :enabled="true"
                    :showCheckbox="false"
                    @filterChange="onShelfFilterChange"
                    :initialValue="currentShelf"
                />
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
        <div class="subfolder-row">
            <Folder v-for="folder in fullFolder.Folders" :key="folder.id" :folder="folder" />
            <button @click="showAddFolderModal = true" class="btn primary add-subfolder-btn">
                +
            </button>
        </div>
        <button @click="onShowDocumentModal" class="btn primary">
            Добавить документ
        </button>
        <div class="document-list-container">
            <div class="header">
                <span>Инв №</span>
                <span>Обозначение</span>
                <span>Документ</span>
                <span>Стикер</span>
            </div>
            <div class="document-list">
                <Document v-for="doc in fullFolder.Documents" :key="doc.id" :document="doc" />
            </div>
        </div>
        <md-dialog :md-active.sync="showAddFolderModal">
            <FolderModal :isSubfolder="true" :parentFolderId="fullFolder.id" @closeFolderModal="closeAddFolderModal" />
        </md-dialog>
        <md-dialog :md-active.sync="showDocumentModal">
            <DocumentModal :folderId="fullFolder.id" @closeDocModal="closeDocModal" />
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
    export default class ViewFolder extends Vue {
        @State currentFolderId;
        @State currentFolder;
        @State currentShelf;
        @State shelvesMap;
        @State shelves;
        @Action getDocumentsByFolder;
        @Action getFolderFull;
        @Action toggleFolderView;
        @Action updateFolder;
        public folderEditMode = false;
        public showDocumentModal = false;
        public showAddFolderModal = false;
        public markForDelete = false;
        public fullFolder = {};
        public shelfFilter = {
            name: '',
            number: 1,
        };
        async created() {
            if (this.currentFolderId) {
                await this.getFolderFull(this.currentFolderId);
                this.fullFolder = this.currentFolder;
            }
            this.shelfFilter.name = this.currentShelf.name;
            this.shelfFilter.number = this.currentShelf.number;
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

        public onShowAddFolderModal() {
            this.showAddFolderModal = true;
        }

        public closeAddFolderModal() {
            this.showAddFolderModal = false;
        }

        public editModeOn() {
            this.folderEditMode = true;
        }
        public editModeOff() {
            this.folderEditMode = false;
        }
        public toggleEditMode() {
            this.folderEditMode = !this.folderEditMode;
        }

        public onClickSave() {
            const currShelf = this.currentShelf;

            const newShelf = this.shelves.find(
                (shelf) => shelf.name === this.shelfFilter.name && shelf.number == this.shelfFilter.number,
            );

            this.updateFolder({
                newFolder: {
                    ...this.fullFolder,
                    ShelfId: newShelf.id,
                },
                currShelf,
                newShelf,
            });
            this.editModeOff();
        }
        public onClose() {
            this.folderEditMode = false;
            this.markForDelete = false;
        }
        public onDeleteFolder() {
            this.markForDelete = true;
        }

        public onShelfFilterChange(filterValues) {
            this.shelfFilter = filterValues;
        }

        public closeFolderModal() {
            this.toggleFolderView();
            // this.$emit('closeFolderModal');
        }
    }
</script>

<style lang="scss">
    @import '../styles/folderview.styles.scss';
</style>
