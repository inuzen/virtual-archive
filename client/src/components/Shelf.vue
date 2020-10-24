<template>
    <div class="shelf">
        <div class="md-layout">
            <div class="">{{shelf.number}}</div>
            <div class="folders-container" @mouseover="showCreateBtn = true" @mouseleave="showCreateBtn = false">
                <div class="create-folder-btn" v-if="showCreateBtn">
                    <div class="create-icon">+</div>
                    <div class="create-folder-btn__text">Создать папку</div>
                </div>
                <Folder v-for="folder in shelf.folders" :folder="folder" :key="folder.id" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

import { ShelfClass } from '@/classes/shelf.ts'

import Folder from './Folder.vue'

@Component({
    components: {
        Folder,
    },
})
export default class Shelf extends Vue {
    @Prop(Object) public shelf!: ShelfClass[]

    public showCreateBtn: boolean = false
}
</script>

<style lang="scss">
.folders-container {
    width: 500px;
    height: 500px;
    border: 5px solid #E0E0E0;
    padding: 22px;
    position: relative;

}

.create-folder-btn {
    display: flex;
    position: absolute;
    align-items: center;
    top: -24px;
    left: -25px;

    .create-icon {
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 60px;
        color: white;
        font-weight: bold;
        background-color: #1BC3CE;
        border-radius: 10px;
        cursor: pointer;
    }

    &__text {
        background-color: white;
        padding: 8px;
        font-size: 20px;
        border-radius: 5px;
        margin-left: 2px;
        box-shadow: 1px 1px 5px #D3D3D3;
    }
}
</style>