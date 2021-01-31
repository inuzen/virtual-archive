<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-if="showCheckbox" v-on:click="onClick">
            <input type="checkbox" v-model="enabled" name="" id="" />Поиск по полкам
        </div>
        <div class="filter-row combined-filter">
            <div class="input-wrapper">
                <label for="" class="input-label" :class="{ disabled: !enabled }">Название шкафа</label>
                <select
                    @change="(val) => onInputChange(val, 'name')"
                    class="input-select no-right-border"
                    :disabled="!enabled"
                >
                    <option
                        v-for="item in columnNames"
                        :key="item"
                        :value="item"
                        :selected="item === filterValues.name"
                        >{{ item }}</option
                    >
                </select>
            </div>
            <div class="input-wrapper shelf-select-n">
                <label for="" class="input-label" :class="{ disabled: !enabled }">№</label>
                <select
                    @change="(val) => onInputChange(val, 'number')"
                    class="input-select no-left-border-r"
                    :disabled="!enabled"
                >
                    <option
                        v-for="item in shelfNumber"
                        :key="item"
                        :value="item"
                        :selected="item === filterValues.number"
                        >{{ item }}</option
                    >
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { State, Action } from 'vuex-class';
    import TextInput from '@/components/TextInput.vue';

    @Component({
        components: {
            TextInput,
        },
    })
    export default class ShelfFilter extends Vue {
        @Prop(Boolean) public showCheckbox;
        @Prop(Boolean) public enabled;
        @Prop() public initialValue;
        @Prop(Boolean) public moveMode;

        @State columnNames;
        @Action setShelfFilter;
        @State shelfFilter;

        public shelfNumber = [1, 2, 3, 4, 5, 6];
        private filterValues;
        public emptyFilter = {
            name: '',
            number: 1,
        };

        created() {
            if (this.initialValue) {
                this.filterValues = { ...this.initialValue };
            } else {
                this.filterValues = this.emptyFilter;
            }
        }

        public onClick() {
            this.$emit('toggleChkbx');
        }

        public onInputChange(event, inputName) {
            this.filterValues[inputName] = event.target.value;
            this.$emit('filterChange', this.filterValues);
        }
    }
</script>

<style scoped lang="scss">
    .shelf-select-n {
        max-width: 60px;
    }
    .shelf-filter {
        min-width: 250px;
        flex: 0 1;
    }
</style>
