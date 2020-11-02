<template>
  <div class="filter-container shelf-filter">
      <div class="checkbox-wrapper"><input type="checkbox" v-model="useFilter" name="" id="">Поиск по документу</div>
      <div class="filter-row">
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !useFilter}">Инв №</label>
             <input :disabled="!useFilter" type="text" name="" id=""/>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !useFilter}">Обозначение</label>
             <input :disabled="!useFilter" type="text" name="" id=""/>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label" :class="{disabled: !useFilter}">Название</label>
             <input :disabled="!useFilter" type="text" name="" id=""/>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DocumentFilter extends Vue {
    public useFilter = false
}

</script>

<style scoped lang="scss">

</style>
