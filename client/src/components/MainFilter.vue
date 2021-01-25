<template>
    <div class="main-filter">
        <div class="single-row">
            <ShelfFilter
                :enabled="shelfFilterEnabled"
                :showCheckbox="true"
                :initialValue="localShelfFilter"
                @toggleChkbx="onShelfToggle"
                @filterChange="onShelfFilterChange"
            />
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
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
        @Action setShelfFilter;

        @State shelvesMap;
        @State filterValues;
        // @State shelfFilter;
        @State documentFilter;
        @State folderFilter;
        @State columnNames;

        @Watch('columnNames')
        onColumnNameChange() {
            this.localShelfFilter.name = this.columnNames[0];
        }

        public shelfFilterEnabled: boolean = false;
        public folderFilterEnabled: boolean = false;
        public documentFilterEnabled: boolean = false;
        public localShelfFilter = {
            name: '',
            number: 1,
        };

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
            if (this.shelfFilterEnabled) {
                const shelfIDs = this.shelvesMap[this.localShelfFilter.name]
                    .map((shelf: any) => {
                        if (shelf.number == this.localShelfFilter.number) {
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

        public onShelfFilterChange(filterValue) {
            this.localShelfFilter = filterValue;
        }
    }
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .main-filter {
        margin-bottom: 15px;
        .input-wrapper {
            margin-right: 10px;
        }
    }
    .single-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        & > * {
            flex: 1 0 10%;
            max-width: 60%;
        }
    }

    .doc-filter-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
        .filter-container {
            flex: 1 0;
            margin-right: 10px;
        }
        .btn {
            flex: 1 0;
            max-width: 240px;
            &.clear-filter {
                width: 40px;
                min-width: 10px;
                max-width: 60px;
                padding: 2px;
                line-height: 0;
                margin-left: 10px;
                border-color: $delete;
                color: $delete;
            }
        }
    }
</style>
