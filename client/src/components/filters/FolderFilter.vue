<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-on:click="onClick">
            <input type="checkbox" @input="toggleFilter" v-model="filterValues.enabled" name="" id="" />Поиск по папкам
        </div>
        <div class="filter-row">
            <TextInput
                :label="'Название папки'"
                @input="(val) => onInputChange(val, 'name')"
                :disabled="!filterValues.enabled"
            />
            <TextInput :label="'№'" @input="(val) => onInputChange(val, 'number')" :disabled="!filterValues.enabled" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import TextInput from '@/components/TextInput.vue';

    @Component({
        components: {
            TextInput,
        },
    })
    export default class FolderFilter extends Vue {
        public initialState = {
            name: '',
            number: '',
            year: '',
        };
        public filterValues = {
            enabled: false,
            ...this.initialState,
        };
        created() {
            this.$emit('filterChange', this.filterValues);
        }
        public toggleFilter() {
            this.filterValues = { ...this.filterValues, ...this.initialState };

            this.$emit('toggleChkbx', this.filterValues.enabled);
        }
        public onClick() {
            this.filterValues.enabled = !this.filterValues.enabled;
            this.$emit('toggleChkbx', this.filterValues.enabled);
        }

        public onInputChange(value, inputName) {
            this.filterValues[inputName] = value;

            this.$emit('filterChange', this.filterValues);
        }
    }
</script>

<style scoped lang="scss"></style>
