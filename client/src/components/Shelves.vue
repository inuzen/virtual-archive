<template>
    <div class="shelf-container">
        <div class="headers">
            <span v-for="name in columnNames" :key="name">{{ name }}</span>
        </div>
        <div class="shelves">
            <div class="shelf-column" v-for="(shelfArr, name) in shelvesMap" :key="name">
                <Shelf v-for="shelf in shelfArr" :key="shelf.id" :shelf="shelf" />
            </div>
        </div>
        <md-dialog :md-active.sync="showFolderView">
            <ViewFolder />
        </md-dialog>
        <md-dialog :md-active.sync="showSubfolderView">
            <ViewSubfolder />
        </md-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
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
        @Action toggleFolderView;
        @Action toggleSubfolderView;

        created() {
            this.$store.dispatch('loadShelvesWithFolders');
        }

        getRInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        }
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
