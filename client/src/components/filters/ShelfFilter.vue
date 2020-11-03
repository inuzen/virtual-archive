<template>
  <div class="filter-container shelf-filter">
      <div class="checkbox-wrapper" v-on:click="onClick"><input type="checkbox" @input="toggleCheckbox" v-model="enableFilter" name="" id="">Поиск по шкафу</div>
      <div class="filter-row combined-filter">
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !enableFilter}">Название шкафа</label>
              <select class="input-select no-right-border" :disabled="!enableFilter" name="" id="">
                  <option v-for="item in shelfNames" :key="item" :value="item">{{item}}</option>                  
              </select>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !enableFilter}">№</label>
              <select class="input-select no-left-border-r" :disabled="!enableFilter" name="" id="">
                  <option v-for="item in shelfNumber" :key="item" :value="item">{{item}}</option>
              </select>
          </div>         
      </div>
      <TextInput :label="'Hello'" @input="(val)=>onInputChange(val, 'in1')"  :disabled="!enableFilter" />
      <TextInput :label="'Hello2'" @input="(val)=>onInputChange(val, 'in2')"  :disabled="!enableFilter" />
      <span>{{obj}}</span>
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
    
    public enableFilter = false
    public shelfNames = ['НТЦ Протей', 'НТЦ Протей2', 'НТЦ Протей3']
    public shelfNumber = [1, 2, 3, 4, 5, 6]
    public input = ''
    public input2 = ''
    public obj = {
        in1: '',
        in2: ''
        
    }
    public toggleCheckbox () {
        this.$emit('toggleChkbx', this.enableFilter)
    }
    public onClick () {
        this.enableFilter = !this.enableFilter;
        this.$emit('toggleChkbx', this.enableFilter)
    } 

    public onInputChange (value, inputName) {
        this.obj[inputName] = value
        
        this.$emit('filterChange', this.obj);        
    }


}

</script>

<style scoped lang="scss">

</style>
