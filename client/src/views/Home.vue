<template>
    <div class="home">
        <MainFilter />
        <Shelves />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import MainFilter from '@/components/MainFilter.vue';
    import Shelves from '@/components/Shelves.vue';

    @Component({
        components: {
            MainFilter,
            Shelves,
        },
    })
    export default class Home extends Vue {}
</script>
<style lang="scss">
    .home {
    }
    .md-dialog-container {
        max-height: 95% !important;
        max-width: 100% !important;
    }
</style>
