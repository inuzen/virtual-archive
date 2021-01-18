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
            <div class="folder__designation">{{ folder.designation }}</div>
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
        height: 20px;
        width: 220px;
        background-color: #0b26cb;
        padding: 2px 6px;
        border-radius: 2px;
        margin: 1px;
        font-size: 10px;
        cursor: pointer;
        &.highlight {
            // border: 2px solid $interactive;
            box-shadow: 0px 0px 9px 5px rgba(27, 195, 206, 1);
            position: relative;
            z-index: 10;
        }
       
        .folder-container {
            background-color: white;
            height: 100%;
        }

        &__name {
            
            font-size: 7px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            line-height: 1.2;
            text-transform: uppercase;
            white-space: normal;
            max-width: 80%;
            //transform: translateX(-15px);
        }

        &__designation {

            font-size: 7px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 40%;
           // transform: translate(70px,7px);
      
        }

        &__year {
            font-size: 7px;
            color: #9a9a9a;
            overflow: hidden;
            //transform: translateY(5px);
            
            span {
                display: block;
                width: 20px;
                transform: rotate(-90deg);
                  }
        }

        &__number {
            float: right;
            font-size: 8px;
            font-weight: 400;
            margin-right: 10px;                      
        }

    &.a3 {
        height: 20px;
        background-color: #000000;
    }

    }
        
</style>
