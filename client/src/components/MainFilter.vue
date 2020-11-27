<template>
    <div class="main-filter">
        <div class="single-row">
            <ShelfFilter :enabled="shelfFilterEnabled" :showCheckbox="true" @toggleChkbx="onShelfToggle" />
            <FolderFilter :enabled="folderFilterEnabled" @toggleChkbx="onFolderToggle" />
        </div>
        <div class="doc-filter-row">
            <DocumentFilter :enabled="documentFilterEnabled" @toggleChkbx="onDocToggle" />
            <button @click="onClick" class="btn primary">ИСКАТЬ</button>
            <button @click="onClearFilters" class="btn secondary clear-filter">X</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ShelfFilter from '@/components/filters/ShelfFilter.vue';
    import FolderFilter from '@/components/filters/FolderFilter.vue';
    import DocumentFilter from '@/components/filters/DocumentFilter.vue';
    import { State, Action } from 'vuex-class';
    @Component({
        components: {
            ShelfFilter,
            FolderFilter,
            DocumentFilter,
        },
    })
    export default class MainFilter extends Vue {
        @Action setHighlightedShelfs;
        @Action findFolder;
        @Action findDocument;
        @Action clearFilters;
        @Action setFolderFilter;
        @State shelvesMap;
        @State filterValues;
        @State shelfFilter;
        @State documentFilter;
        @State folderFilter;

        public shelfFilterEnabled: boolean = false;
        public folderFilterEnabled: boolean = false;
        public documentFilterEnabled: boolean = false;

        public onFolderToggle() {
            this.folderFilterEnabled = !this.folderFilterEnabled;
        }
        public onDocToggle() {
            this.documentFilterEnabled = !this.documentFilterEnabled;
        }
        public onShelfToggle() {
            this.shelfFilterEnabled = !this.shelfFilterEnabled;
        }

        public async onClick() {
            console.log(this.documentFilterEnabled);
            console.log(this.folderFilterEnabled);

            if (this.shelfFilterEnabled) {
                const shelfIDs = this.shelvesMap[this.shelfFilter.name]
                    .map((shelf: any) => {
                        if (shelf.number == this.shelfFilter.number) {
                            return shelf.id;
                        }
                    })
                    .filter((e) => e);
                this.setHighlightedShelfs(shelfIDs);
            }
            if (this.folderFilterEnabled && !this.documentFilterEnabled) {
                this.findFolder(this.folderFilter);
            }
            if (this.documentFilterEnabled) {
                this.findDocument(this.documentFilter);
            }
        }
        public onClearFilters() {
            this.clearFilters();
        }
    }
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .main-filter {
        margin-bottom: 90px;
        .input-wrapper {
            margin-right: 30px;
        }
    }
    .single-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        & > * {
            flex: 1 0 30%;
            max-width: 46%;
        }
    }

    .doc-filter-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        .filter-container {
            flex: 1 0;
            margin-right: 30px;
        }
        .btn {
            flex: 1 0;
            max-width: 240px;
            &.clear-filter {
                width: 60px;
                min-width: 60px;
                max-width: 60px;
                padding: 18px;
                line-height: 0;
                margin-left: 30px;
                border-color: $delete;
                color: $delete;
            }
        }
    }
</style>
