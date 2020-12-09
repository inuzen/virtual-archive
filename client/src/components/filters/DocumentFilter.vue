<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-on:click="onClick">
            <input type="checkbox" v-model="enabled" name="" id="" />Поиск по документам
        </div>
        <div class="filter-row">
            <TextInput :label="'Инв №'" @input="(val) => onInputChange(val, 'number')" :disabled="!enabled" />
            <TextInput
                :label="'Обозначение'"
                @input="(val) => onInputChange(val, 'designation')"
                :disabled="!enabled"
            />
            <TextInput :label="'Название'" @input="(val) => onInputChange(val, 'name')" :disabled="!enabled" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { State, Action } from 'vuex-class';
    import TextInput from '@/components/TextInput.vue';

    @Component({
        components: {
            TextInput,
        },
    })
    export default class DocumentFilter extends Vue {
        @Prop(Boolean) public enabled;
        @Action setDocumentFilter;
        @State documentFilter;

        private filterValues;

        public emptyFilter = {
            name: '',
            number: '',
            designation: '',
        };
        created() {
            this.setDocumentFilter(this.emptyFilter);
            this.filterValues = this.documentFilter;
        }
        updated() {
            if (this.enabled) {
                this.setDocumentFilter(this.emptyFilter);
            } else {
                this.setDocumentFilter(null);
            }
        }
        public onClick() {
            this.$emit('toggleChkbx');
        }
        public onInputChange(value, inputName) {
            this.filterValues[inputName] = value;

            this.setDocumentFilter(this.filterValues);
        }
    }
</script>

<style scoped lang="scss"></style>
