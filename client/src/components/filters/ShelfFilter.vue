<template>
  <div class="filter-container shelf-filter">
      <div class="checkbox-wrapper"><input type="checkbox" v-model="useFilter" name="" id="">Поиск по шкафу</div>
      <div class="filter-row combined-filter">
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !useFilter}">Название шкафа</label>
              <select class="input-select no-right-border" :disabled="!useFilter" name="" id="">
                  <option v-for="item in shelfNames" :key="item" :value="item">{{item}}</option>                  
              </select>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !useFilter}">№</label>
              <select class="input-select no-left-border-r" :disabled="!useFilter" name="" id="">
                  <option v-for="item in shelfNumber" :key="item" :value="item">{{item}}</option>
              </select>
          </div>         
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ShelfFilter extends Vue {

    public shelfNames = ['НТЦ Протей', 'НТЦ Протей2', 'НТЦ Протей3']
    public shelfNumber = [1, 2, 3, 4, 5, 6]
    public useFilter = false
}

</script>

<style scoped lang="scss">

</style>
