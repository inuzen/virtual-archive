<template>
  <div class="main-filter">
  <ShelfFilter />
    <div class="md-layout md-gutter">
        <div class="md-layout-item mad-layout md-layout-gutter">
                    <div class="md-layout-item">
            <md-field md-clearable>
                <label>Название шкафа</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-15">
            <md-field md-clearable>
                <label>Номер шкафа</label>
                <md-input></md-input>
            </md-field>
        </div>
        </div>
        <div class="md-layout-item mad-layout-gutter">
        <div class="md-layout-item">
            <md-field md-clearable>
                <label>Название папки</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-15">
            <md-field md-clearable>
                <label>Номер папки</label>
                <md-input></md-input>
            </md-field>
        </div>
        </div>


    </div>
    
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-25">
            <md-field md-clearable>
                <label>Номер документа</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-25">
            <md-field md-clearable>
                <label>Обозначение документа</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="md-layout-item">
            <md-field md-clearable>
                <label>Название документа</label>
                <md-input></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-15">
            <md-button class="md-raised md-primary">Искать</md-button>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ShelfFilter from '@/components/filters/ShelfFilter.vue'

@Component({
  components: {
    ShelfFilter,
  },
})
export default class MainFilter extends Vue {
}

</script>

<style scoped lang="scss">
</style>
