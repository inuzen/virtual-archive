<template>
    <div class="shelves">
        <Shelf v-for="shelf in shelves" :key="shelf.id" :shelf="shelf"/>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import Shelf from './Shelf.vue'

@Component({
    components: {
        Shelf,
    },
})
export default class Shelves extends Vue {
    public shelves = [
        {
            name: 'шкаф',
            id: 123,
            number: 1,
            folders: [{ name: 'folder name', year: 2020, number: 1, id: 123},
            { name: 'Длинное название', year: 2020, number: 66666, id: 1243},
            { name: 'folder name', year: 2020, number: 3, id: 322}],
        },
        {
            name: 'шкаф',
            id: 1223,
            number: 2,
            folders: [{ name: 'folder name', year: 2020, number: 1, id: 223},
            { name: 'folder name', year: 2020, number: 2, id: 1253},
            { name: 'folder name', year: 2020, number: 3, id: 332}],
        },
        {
            name: 'шкаф',
            id: 1235,
            number: 3,
            folders: [{ name: 'folder name', year: 2020, number: 1, id: 555},
            { name: 'folder name', year: 2020, number: 2, id: 1233343},
            { name: 'folder name', year: 2020, number: 3, id: 222}],
        },
    ]
}
</script>