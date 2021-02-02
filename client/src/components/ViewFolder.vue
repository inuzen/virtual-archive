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
                <div v-if="!folderEditMode" class="designation">
                    {{ fullFolder.designation }}
                </div>
                <div v-if="!folderEditMode" class="number">
                    {{ fullFolder.number }}
                </div>
                <div v-if="!folderEditMode" class="doc_type">
                    {{ fullFolder.doc_type }}
                </div>

                <div v-if="folderEditMode" class="name">
                    <TextInput @input="(val) => onInputChange(val, 'name')" :value="fullFolder.name" />
                </div>
                <div v-if="folderEditMode" class="short_name">
                    <TextInput @input="(val) => onInputChange(val, 'short_name')" :value="fullFolder.short_name" />
                </div>
                <div v-if="folderEditMode" class="designation">
                    <TextInput @input="(val) => onInputChange(val, 'designation')" :value="fullFolder.designation" />
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
            <p class="label">Переместить в</p>
            <div class="folder-actions-row">
                <ShelfFilter :enabled="true"
                             :showCheckbox="false"
                             @filterChange="onShelfFilterChange"
                             :initialValue="currentShelf" />
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
                Добавить подпапку
            </button>
        </div>
        <button @click="onShowDocumentModal" class="btn primary">
            Добавить документ
        </button>
        <div class="document-list-container">
            <span class="document-list__label">Всего документов в папке: {{ fullFolder.Documents.length }}</span>
            <div class="header">
                <span>Инв №</span>
                <span>Обозначение</span>
                <span>Документ</span>
                <span>Тип документа</span>
                <span>Дата принятия в архив</span>
                <span>Стикер</span>
            </div>
            <div v-if="foundDocuments.length" class="document-list search-result">
                <span class="document-list__label"> Найдено документов: {{ foundDocuments.length }}</span>
                <Document v-for="doc in foundDocuments" :key="doc.id" :document="doc" />
            </div>
            <div class="document-list">
                <span class="document-list__label" v-if="foundDocuments.length">Все документы:</span>
                <template v-if="showAll">
                    <Document v-for="doc in fullFolder.Documents" :key="doc.id" :document="doc" />
                </template>
                <template v-if="!showAll">
                    <Document v-for="doc in fullFolder.Documents.slice(0, 15)" :key="doc.id" :document="doc" />
                </template>
               </div>
            <p class="show-all-btn" @click="() => (showAll = !showAll)">{{ showAll ? 'Скрыть' : 'Показать все' }}</p>
           
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
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
        @State shelves;
        @State highlightedDocuments;
        @Action getDocumentsByFolder;
        @Action getFolderFull;
        @Action toggleFolderView;
        @Action updateFolder;
        @Action deleteFolder;

        public folderEditMode = false;
        public showDocumentModal = false;
        public showAddFolderModal = false;
        public markForDelete = false;
        public showAll = false;
        public foundDocuments = [];
        public fullFolder: any = {};
        public shelfFilter = {
            name: '',
            number: 1,
        };
        async created() {
            if (this.currentFolderId) {
                await this.getFolderFull(this.currentFolderId);
                this.fullFolder = this.currentFolder;
                this.foundDocuments = this.fullFolder.Documents.filter((doc) =>
                    this.highlightedDocuments.includes(doc.id),
                );
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
            if (this.markForDelete) {
                this.deleteFolder({ folderId: this.currentFolderId, currShelf: this.currentShelf });
                this.closeFolderModal();
            } else {
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

        public onShelfFilterChange(filterValues) {
            this.shelfFilter = filterValues;
        }

        public closeFolderModal() {
            this.toggleFolderView();
        }
    }
</script>

<style lang="scss">
    @import '../styles/folderview.styles.scss';
</style>
