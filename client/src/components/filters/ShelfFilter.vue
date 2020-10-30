<template>
  <div class="filter-container shelf-filter">
      <div class="checkbox-wrapper"><input type="checkbox" name="" id="">Поиск по шкафу</div>
      <div class="filter-wrapper combined-filter">
          <div class="input-wrapper">
              <label for="" class="input-label">Название шкафа</label>
              <select class="input-select" name="" id="">
                  <option value="1">НТЦ Протей</option>
                  <option value="2">НТЦ Протей2</option>
                  <option value="3">НТЦ Протей3</option>
              </select>
          </div>
          <div class="input-wrapper">
              <label for="" class="input-label">#</label>
              <select class="input-select" name="" id="">
                  <option v-for="item in [1,2,3,4,5,6]" :key="item" :value="item">{{item}}</option>
              </select>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ShelfFilter extends Vue {}

</script>

<style scoped lang="scss">
@import '../../styles/colors.scss';

.filter-container{
    display: flex;
        flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    .checkbox-wrapper{
        font-size: 20px;
        line-height: 150%;
        font-weight: bold;
        color: $text-folder;
        margin-bottom: 20px;
        input {
            margin-right: 10px;
        }
    }
}

.filter-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.combined-filter{
    justify-content: flex-start;
            
}
.input-wrapper{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    select{
        -moz-appearance:none;
        -webkit-appearance:none;
        appearance:none;
    }
    input, select {
        padding: 15px 30px;
        min-height: 60px;
        border: 1px solid $interactive;
        border-radius: 5px;
        font-size: 20px;
        line-height: 150%;

        }
    .input-label{
        margin-left: 30px;
        font-size: 20px;
        line-height: 150%;
        color: $text-interactive;
    }
    .input-select{

    }
}
</style>
