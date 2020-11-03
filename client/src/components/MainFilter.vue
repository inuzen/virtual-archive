<template>
  <div class="main-filter">
  <div class="single-row">
    <ShelfFilter @filterChange="onFilterChange" />
    <FolderFilter />
  </div>
  <div class="doc-filter-row">
      <DocumentFilter/>
      <button @click="onClick" class="btn primary">Искать</button>
  </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ShelfFilter from '@/components/filters/ShelfFilter.vue'
import FolderFilter from '@/components/filters/FolderFilter.vue'
import DocumentFilter from '@/components/filters/DocumentFilter.vue'

@Component({
  components: {
    ShelfFilter,
    FolderFilter,
    DocumentFilter,
  },
})
export default class MainFilter extends Vue {

    public filter1 = {}

    public onFilterChange (filterValues) {
      this.filter1 = filterValues

    }
    public async onClick  () {
      console.log(this.filter1);
      const bruh = await fetch('fdsa',{ method: 'POST', body: JSON.stringify(this.filter1)})
    }

}

</script>

<style scoped lang="scss">
.main-filter{ 
    margin-bottom:90px;
    
}
.single-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    &>*{
        flex: 1 0 30%;
        max-width: 46%;
    }
}

.doc-filter-row{
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    .filter-container{
      flex: 1 0;
      margin-right: 30px;
    }
    .btn {
      flex: 1 0;
      max-width: 240px;
    }

}
</style>
