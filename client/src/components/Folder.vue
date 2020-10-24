<template>
    <div class="folder ">
        <div class="folder-container md-layout md-alignment-center-space-between">
            <div class="folder__year"><span>{{ folder.year }}</span></div>
            <div>{{ folder.name }}</div>
            <div class="folder__number">{{ folder.number }}</div>
        </div>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

import { FolderClass } from '@/classes/folder.ts'

@Component
export default class Folder extends Vue {
    @Prop(Object) public folder!: FolderClass
}
</script>

<style lang="scss">
.folder {
    height: 30px;
    width: 220px;
    background-color: #9A9A9A;
    padding: 2px 10px;
    border-radius: 2px;
    margin: 2px;
    font-size: 13px;

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