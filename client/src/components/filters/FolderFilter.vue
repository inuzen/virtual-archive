<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-on:click="onClick">
            <input type="checkbox" v-model="enabled" name="" id="" />Поиск по папкам
        </div>
        <div class="filter-row">
            <TextInput :label="'Название папки'" @input="(val) => onInputChange(val, 'name')" :disabled="!enabled" />
            <TextInput :label="'№'" @input="(val) => onInputChange(val, 'number')" :disabled="!enabled" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import TextInput from '@/components/TextInput.vue';
    import { State, Action } from 'vuex-class';
    @Component({
        components: {
            TextInput,
        },
    })
    export default class FolderFilter extends Vue {
        @Prop(Boolean) public enabled;
        @Action setFolderFilter;
        @State folderFilter;
        private filterValues;
        public emptyFilter = {
            name: '',
            number: '',
            year: '',
        };

        created() {
            this.setFolderFilter(this.emptyFilter);
            this.filterValues = this.folderFilter;
        }
        updated() {
            if (this.enabled) {
                this.setFolderFilter(this.emptyFilter);
            } else {
                this.setFolderFilter(null);
            }
        }
        public onClick() {
            this.$emit('toggleChkbx');
        }

        public onInputChange(value, inputName) {
            this.filterValues[inputName] = value;
            this.setFolderFilter(this.filterValues);
        }
    }
</script>

<style scoped lang="scss"></style>
