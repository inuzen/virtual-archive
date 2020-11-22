<template>
    <div class="main-filter">
        <div class="single-row">
            <ShelfFilter :showCheckbox="true" @filterChange="onShelfFilterChange" />
            <FolderFilter @filterChange="onFolderFilterChange" />
        </div>
        <div class="doc-filter-row">
            <DocumentFilter @filterChange="onDocFilterChange" />
            <button @click="onClick" class="btn primary">ИСКАТЬ</button>
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
        @Action clearFilters;
        @State shelvesMap;
        @State filterValues;
        //public shelfFilter: any = { enabled: true };
        //public folderFilter: any = { enabled: false };
        //public documentFilter: any = { enabled: false };
/*      //TODO change this to enabling them, move filter change to vuex
        public onShelfFilterChange(filterValues) {
            this.shelfFilter = filterValues;
        }
        public onFolderFilterChange(filterValues) {
            this.folderFilter = filterValues;
        }
        public onDocFilterChange(filterValues) {
            this.documentFilter = filterValues;
        }
   */
        public async onClick() {            
            if (this.shelfFilter.enabled && !this.folderFilter.enabled && !this.documentFilter.enabled) {
                const foo = this.shelvesMap[this.shelfFilter.name]
                    .map((shelf: any) => {
                        if (shelf.number == this.shelfFilter.number) {
                            return shelf.id;
                        }
                    })
                    .filter((e) => e);
                this.setHighlightedShelfs(foo);
            }
            if (this.folderFilter.enabled) {
                this.findFolder(this.folderFilter);
            }
            if(this.documentFilterEnabled){
                this.findDocument(this.filterValues.documentFilter);
            }
        }
        public onClearFilters () {
            this.clearFilters();
        }
    }
</script>

<style lang="scss">
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
        }
    }
</style>
