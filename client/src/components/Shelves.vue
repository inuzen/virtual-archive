<template>
    <div class="shelf-container">
        <div class="headers">
            <span v-for="name in columnNames" :key="name">{{ name }}</span>
        </div>
        <div class="shelves">
            <!-- <div class="shelf-column" v-for="(shelfArr, name, index) in shelvesMap" :key="name + index">
                <Shelf v-for="shelf in shelfArr" :key="shelf.id" :shelf="shelf" />
            </div> -->
            <div class="shelf-column">
                <Shelf v-for="shelf in shelvesMap[columnNames[0]]" :key="shelf.id" :shelf="shelf" />
            </div>
            <div class="shelf-column">
                <Shelf v-for="shelf in shelvesMap[columnNames[1]]" :key="shelf.id" :shelf="shelf" />
            </div>
            <div class="shelf-column">
                <Shelf v-for="shelf in shelvesMap[columnNames[2]]" :key="shelf.id" :shelf="shelf" />
            </div>
        </div>
        <md-dialog :md-active.sync="showFolderView">
            <ViewFolder />
        </md-dialog>
        <md-dialog :md-active.sync="showSubfolderView">
            <ViewSubfolder />
        </md-dialog>
        <md-dialog-confirm
            :md-active="error"
            md-title="No matches"
            md-content="No results matching your search parameters"
            @md-confirm="toggleError"
            @md-cancel="toggleError"
        />
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Shelf from './Shelf.vue';
    import ViewFolder from './ViewFolder.vue';
    import ViewSubfolder from './ViewSubfolder.vue';
    import { State, Action } from 'vuex-class';

    import { mapState } from 'vuex';
    @Component({
        components: {
            Shelf,
            ViewFolder,
            ViewSubfolder,
        },
    })
    export default class Shelves extends Vue {
        @State shelvesMap;
        @State columnNames;
        @State showFolderView;
        @State showSubfolderView;
        @State error;
        @State highlightedShelfs;
        @State highlightedFolders;
        @Action toggleFolderView;
        @Action toggleError;
        @Action toggleSubfolderView;
        @Action loadShelvesWithFolders;
        @Action loadShelves;

        @Watch('highlightedShelfs')
        onShelvesChanged() {
            if (this.highlightedFolders.length) {
                setTimeout(() => {
                    const el = document.querySelector('.folder.highlight');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 0);
                return;
            }
            if (this.highlightedShelfs.length) {
                setTimeout(() => {
                    const el = document.querySelector('.folders-container.highlight');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 0);
            }
        }

        private showErrorDialog = false;
        created() {
            this.loadShelves();
            this.loadShelvesWithFolders();
        }

        getRInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        }

        public closeAlert() {}
    }
</script>

<style lang="scss">
    .headers {
        display: grid;
        grid-template-columns: repeat(3, 500px);
        margin-bottom: 35px;
        align-content: center;
        font-weight: bold;
        font-size: 20px;
        line-height: 150%;
        text-transform: uppercase;
    }
    .shelves {
        display: grid;
        grid-template-columns: repeat(3, 500px);
        // grid-template-rows: repeat(6, 500px);
        grid-gap: 40px;
        .shelf-column {
            display: grid;
            // grid-template-columns: repeat(3, 500px);
            grid-template-rows: repeat(6, 500px);
            grid-gap: 40px;
        }
        margin-bottom: 50px;
    }
</style>
