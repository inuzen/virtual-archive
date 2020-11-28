<template>
    <div class="shelf">
        <div
            class="folders-container"
            :class="{ highlight: highlightedShelfs.includes(shelf.id) }"
            @click="onShelfClick"
            @mouseover="showCreateBtn = true"
            @mouseleave="showCreateBtn = false"
        >
            <div class="create-folder-btn" v-if="showCreateBtn" @click="onAddFolder">
                <div class="create-icon">+</div>
                <div class="create-folder-btn__text">Создать папку</div>
            </div>
            <Folder
                @click="onActivate"
                :active="activate"
                v-for="folder in shelf.Folders"
                :folder="folder"
                :key="folder.id"
            />
        </div>
        <md-dialog v-if="showCreateBtn || showNewFolderModal" :md-active.sync="showNewFolderModal"
            ><FolderModal :isSubfolder="false" @closeFolderModal="closeFolderModal"
        /></md-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import FolderModal from '@/components/dialogs/FolderModal.vue';

    import Folder from './Folder.vue';
    import { State } from 'vuex-class';

    @Component({
        components: {
            Folder,
            FolderModal,
        },
    })
    export default class Shelf extends Vue {
        @Prop(Object) public shelf;
        @State highlightedShelfs;

        public showNewFolderModal = false;
        public showCreateBtn: boolean = false;
        public activate = false;
        public closeFolderModal() {
            this.showNewFolderModal = false;
        }
        onActivate() {
            this.activate = true;
        }
        onShelfClick() {
            if (this.shelf) {
                const { id, name, number } = this.shelf;
                this.$store.dispatch('setCurrentShelf', { id, name, number });
            }
        }
        onAddFolder() {
            this.onShelfClick();
            console.log(this.shelf);

            this.showNewFolderModal = true;
        }
    }
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .shelf {
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow: visible;
    }
    .folders-container {
        width: 100%;
        height: 100%;
        border: 5px solid #e0e0e0;
        padding: 22px;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        overflow: auto;

        &.highlight {
            border-color: $interactive;
        }
    }

    .create-folder-btn {
        display: flex;
        position: absolute;
        align-items: center;
        top: -24px;
        left: -25px;
        z-index: 100;

        .create-icon {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            color: white;
            font-weight: bold;
            background-color: #1bc3ce;
            border-radius: 10px;
            cursor: pointer;
        }

        &__text {
            background-color: white;
            padding: 8px;
            font-size: 20px;
            border-radius: 5px;
            margin-left: 2px;
            box-shadow: 1px 1px 5px #d3d3d3;
        }
    }
</style>
