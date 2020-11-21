<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-on:click="onClick">
            <input type="checkbox" @input="toggleFilter" v-model="filterValues.enabled" name="" id="" />Поиск по
            документам
        </div>
        <div class="filter-row">
            <TextInput
                :label="'Инв №'"
                @input="(val) => onInputChange(val, 'number')"
                :disabled="!filterValues.enabled"
            />
            <TextInput
                :label="'Обозначение'"
                @input="(val) => onInputChange(val, 'designation')"
                :disabled="!filterValues.enabled"
            />
            <TextInput
                :label="'Название'"
                @input="(val) => onInputChange(val, 'name')"
                :disabled="!filterValues.enabled"
            />
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
    export default class DocumentFilter extends Vue {
        public filterValues = {
            enabled: false,
            name: '',
            number: '',
            designation: '',
        };
        created() {
            this.$emit('filterChange', this.filterValues);
        }
        public toggleFilter() {
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
