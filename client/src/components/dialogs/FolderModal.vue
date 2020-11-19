<template>
    <div class="edit-modal document-modal">
        <header class="modal-title">новый документ</header>
        <div class="modal-content">
            <p class="modal-info shelf">{{currentShelf.name}}</p>
            <!-- <p class="modal-info">Папка №66666</p> -->
            <div class='form-container'>
                <TextInput :label="'Название'" @input="(val)=>onInputChange(val, 'name')"  />
                <TextInput :label="'Номер'" @input="(val)=>onInputChange(val, 'number')" />
                <TextInput :label="'Год'" @input="(val)=>onInputChange(val, 'year')" />
            <div class="button-row">
                <md-radio v-model="folderValues.format" class="md-primary" value="A3" >A3</md-radio>
                <md-radio v-model="folderValues.format" class="md-primary" value="A4" >A4</md-radio>
            </div>
            <div class="button-row">
                <button @click="onClose" class="btn slim secondary">Отменить</button>
                <button @click="onClickSave" class="btn slim primary">Сохранить</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import {mapState} from "vuex";
import TextInput from '@/components/TextInput.vue'

@Component({
  components: {
    TextInput,
    },
    computed: {...mapState(['currentShelf'])}
})
export default class FolderModal extends Vue {

    private initialValues = {
        name: '',
        number: '',
        year: '',
        format: 'A4',
    }
    
    public folderValues = this.initialValues;

    public onInputChange (value, inputName) {
        this.folderValues[inputName] = value                
    }
    public onClickSave () {
        // console.log({...this.documentValues, tags: this.documentValues.tags.split(','), FolderId: this.folderId});
        
        this.$store.dispatch('addFolder', {
                folder: {...this.folderValues, isSubFolder: false, shelfID: this.currentShelf.id},
                shelf: this.currentShelf
            }
        );
        // this.$emit('change-document', this.documentValues)
        console.log(this.folderValues);
        
        this.$emit('closeFolderModal');

    }
    public onClose () {
        this.folderValues = {...this.initialValues}
        this.$emit('closeFolderModal');
    }   
}
</script>

<style scoped lang="scss">
@import '../../styles/edit-modal.styles.scss';

</style>