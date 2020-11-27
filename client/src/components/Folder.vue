<template>
    <div
        class="folder"
        :class="[highlightedFolders.includes(folder.id) ? 'highlight' : '', folder.format]"
        @mouseover="renderDialog = true"
        @mouseleave="renderDialog = false"
    >
        <div @click="onShowFolderModal" class="folder-container md-layout md-alignment-center-space-between">
            <div class="folder__year">
                <span>{{ folder.year }}</span>
            </div>
            <div class="folder__name">{{ folder.name }}</div>
            <div class="folder__number">{{ folder.number }}</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    // import ViewFolder from '@/components/ViewFolder.vue';
    import { State, Action } from 'vuex-class';
    //TODO move view folder to main screen instead
    @Component({
        components: {},
    })
    export default class Folder extends Vue {
        @Prop(Object) public folder;
        @State highlightedFolders;
        @Action setCurrentFolderId;
        @Action setCurrentSubfolderId;
        @Action toggleFolderView;
        @Action toggleSubfolderView;

        public showFolderModal = false;
        public renderDialog = false;
        created() {}
        onShowFolderModal() {
            if (this.folder.isSubFolder) {
                this.setCurrentSubfolderId(this.folder.id);
                this.toggleSubfolderView();
            } else {
                this.setCurrentFolderId(this.folder.id);
                this.toggleFolderView();
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .folder {
        height: 30px;
        width: 220px;
        background-color: #9a9a9a;
        padding: 2px 10px;
        border-radius: 2px;
        margin: 2px;
        font-size: 13px;
        &.highlight {
            // border: 2px solid $interactive;
            box-shadow: 0px 0px 10px 8px rgba(27, 195, 206, 1);
            position: relative;
            z-index: 10;
        }

        &.A3 {
            height: 86px;
        }

        .folder-container {
            background-color: white;
            height: 100%;
        }

        &__name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 50%;
        }

        &__year {
            font-size: 10px;
            color: #9a9a9a;
            span {
                display: block;
                transform: rotate(-90deg);
            }
        }

        &__number {
            font-size: 20px;
        }
    }
</style>
