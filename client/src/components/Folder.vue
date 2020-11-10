<template>
    <div class="folder" :class="folder.format">
        <div @click="onShowFolderModal" class="folder-container md-layout md-alignment-center-space-between" >
            <div class="folder__year"><span>{{ folder.year }}</span></div>
            <div>{{ folder.name }}</div>
            <div class="folder__number">{{ folder.number }}</div>
        </div>
        <md-dialog :md-active.sync="showFolderModal"><OpenFolderModal :folder="folder" @closeFolderModal='closeFolderModal'/></md-dialog>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import OpenFolderModal from '@/components/OpenFolderModal.vue'

import { FolderClass } from '@/classes/folder.ts'

@Component({
    components: {OpenFolderModal}
})
export default class Folder extends Vue {
    @Prop(Object) public folder!: FolderClass;

    public showFolderModal = false;

    onShowFolderModal () {
        this.showFolderModal = true;
    }

    closeFolderModal () {
        this.showFolderModal = false;
    }
}
</script>

<style lang="scss">
@import '../styles/colors.scss';

.folder {
    height: 30px;
    width: 220px;
    background-color: #9A9A9A;
    padding: 2px 10px;
    border-radius: 2px;
    margin: 2px;
    font-size: 13px;
    &.highlight{
        // border: 2px solid $interactive;
       box-shadow: 0px 0px 10px 8px rgba(27,195,206,1);
       position: relative;
       z-index: 10;
    }

    &.A3{
        height: 86px;
    }

    .folder-container {
        background-color: white;
        height: 100%;
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