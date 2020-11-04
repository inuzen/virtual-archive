<template>
  <div class="filter-container shelf-filter">
      <div class="checkbox-wrapper" v-on:click="onClick"><input type="checkbox" @input="toggleFilter" v-model="filterValues.enabled" name="" id="">Поиск по полкам</div>
      <div class="filter-row combined-filter">
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !filterValues.enabled}">Название шкафа</label>
              <select @change="onNameChange" class="input-select no-right-border" :disabled="!filterValues.enabled" name="" id="">
                  <option v-for="item in shelfNames" :key="item" :value="item">{{item}}</option>                  
              </select>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !filterValues.enabled}">№</label>
              <select @change="onNumChange" class="input-select no-left-border-r" :disabled="!filterValues.enabled" name="" id="">
                  <option v-for="item in shelfNumber" :key="item" :value="item">{{item}}</option>
              </select>
          </div>         
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator'
import TextInput from '@/components/TextInput.vue'

@Component({
  components: {
    TextInput,
    }
})
export default class ShelfFilter extends Vue {
    // @Model('change', { type: Boolean }) public checked!: boolean
    
    public shelfNames = ['НТЦ Протей', 'НТЦ Протей2', 'НТЦ Протей3']
    public shelfNumber = [1, 2, 3, 4, 5, 6]
    
    public filterValues = {
        enabled: true,
        shelfName: '',
        shelfNumber: 0,
    }
    public toggleFilter () {
        this.$emit('toggleChkbx', this.filterValues.enabled)
    }
    public onClick () {
        this.filterValues.enabled = !this.filterValues.enabled;
        this.$emit('toggleChkbx', this.filterValues.enabled)
    } 

    public onNameChange (event) {
        this.filterValues.shelfName = event.target.value
        this.$emit('filterChange', this.filterValues);        
    }
    public onNumChange (event) {
        this.filterValues.shelfNumber = event.target.value  
        this.$emit('filterChange', this.filterValues);        
    }

    public onInputChange (value, inputName) {
        this.filterValues[inputName] = value
        this.$emit('filterChange', this.filterValues);        
    }


}

</script>

<style scoped lang="scss">

</style>
