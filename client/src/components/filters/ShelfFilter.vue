<template>
    <div class="filter-container shelf-filter">
        <div class="checkbox-wrapper" v-if="showCheckbox" v-on:click="onClick">
            <input type="checkbox" v-model="enabled" name="" id="" />Поиск по полкам
        </div>
        <div class="filter-row combined-filter">
            <div class="input-wrapper">
                <label for="" class="input-label" :class="{ disabled: !enabled }">Название шкафа</label>
                <select @change="onNameChange" class="input-select no-right-border" :disabled="!enabled" name="" id="">
                    <option v-for="item in columnNames" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="input-wrapper">
                <label for="" class="input-label" :class="{ disabled: !enabled }">№</label>
                <select @change="onNumChange" class="input-select no-left-border-r" :disabled="!enabled" name="" id="">
                    <option v-for="item in shelfNumber" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Model } from 'vue-property-decorator';
    import { State, Action } from 'vuex-class';
    import TextInput from '@/components/TextInput.vue';

    @Component({
        components: {
            TextInput,
        },
    })
    export default class ShelfFilter extends Vue {
        // @Model('change', { type: Boolean }) public checked!: boolean
        @Prop(Boolean) public showCheckbox;
        @Prop(Boolean) public enabled;
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
            this.setShelfFilter(this.emptyFilter);
            this.filterValues = this.shelfFilter;
        }
        updated() {
            if (this.enabled) {
                this.setShelfFilter(this.emptyFilter);
            } else {
                this.setShelfFilter(null);
            }
        }

        public onClick() {
            this.$emit('toggleChkbx');
        }

        public onNameChange(event) {
            this.filterValues.name = event.target.value;
            this.setShelfFilter(this.filterValues);
        }
        public onNumChange(event) {
            this.filterValues.number = event.target.value;
            this.setShelfFilter(this.filterValues);
        }

        // public onInputChange (value, inputName) {
        //     this.filterValues[inputName] = value
        //     this.$emit('filterChange', this.filterValues);
        // }
    }
</script>

<style scoped lang="scss"></style>
