<template>
    <div class="shelf-container">
        <div class="headers">
            <span>нтв протей</span>
            <span>протей ст (арх)</span>
            <span>протей (серт)</span>
        </div>
        <div class="shelves">
            <Shelf v-for="shelf in shelves" :key="shelf.id" :shelf="shelf"/>
        </div>
        <!-- <md-dialog :md-active.sync="showFolderModal"><OpenFolderModal :folder="folder" @closeFolderModal='closeFolderModal'/></md-dialog> -->
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import Shelf from './Shelf.vue'
import {mapState} from "vuex";
@Component({
    components: {
        Shelf,
    },
    computed: {...mapState(['shelves'])},
    created() {
    this.$store.dispatch('loadShelves');
  }
})
export default class Shelves extends Vue {
    
    public shelves2: any = []
    public showFolderModal = false;
    constructor() {
        super();

        console.log(this.$store.state.shelves);
        

        // for (let index = 0; index < 18; index++) {
        //     this.shelves.push(
        //         {
        //     name: 'шкаф',
        //     id: this.getRInt(index+1*10, (index+1)*100),
        //     number: index+1,
        //     folders: <any[]> [
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         // { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(0, index*100)},
        //         { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: this.getRInt(index*10, (index+1)*100)},
        //         { name: 'Длинное название', year: 2020, number:this.getRInt(1000, 99999), id: 1243*index, format:'A3'},
        //         { name: 'folder name', year: 2020, number:this.getRInt(1000, 99999), id: 322*index}
        //     ],
        // }
        //         )
            
        // }
    }

    getRInt(min, max) {
        min = Math.ceil(min);
         max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    // [
    //     {
    //         name: 'шкаф',
    //         id: 123,
    //         number: 1,
    //         folders: [{ name: 'folder name', year: 2020, number: 1, id: 123},
    //         { name: 'Длинное название', year: 2020, number: 66666, id: 1243},
    //         { name: 'folder name', year: 2020, number: 3, id: 322}],
    //     },
    //     {
    //         name: 'шкаф',
    //         id: 1223,
    //         number: 2,
    //         folders: [{ name: 'folder name', year: 2020, number: 1, id: 223},
    //         { name: 'folder name', year: 2020, number: 2, id: 1253},
    //         { name: 'folder name', year: 2020, number: 3, id: 332}],
    //     },
    //     {
    //         name: 'шкаф',
    //         id: 1235,
    //         number: 3,
    //         folders: [{ name: 'folder name', year: 2020, number: 1, id: 555},
    //         { name: 'folder name', year: 2020, number: 2, id: 1233343},
    //         { name: 'folder name', year: 2020, number: 3, id: 222}],
    //     },
    // ]
}
</script>

<style lang="scss">
.headers{
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
    grid-template-rows: repeat(6, 500px);
    grid-gap: 40px
}
</style>