<template>
    <div class="edit-modal document-modal">
        <header class="modal-title">новый документ</header>
        <div class="modal-content">
            <p class="modal-info shelf">{{currentShelf.name}}</p>
            <p class="modal-info">Папка №66666</p>
            <div class='form-container'>
                <TextInput :label="'Инв №'" @input="(val)=>onInputChange(val, 'name')"  />
                <TextInput :label="'Обозначение'" @input="(val)=>onInputChange(val, 'number')" />
                <TextInput :label="'Название'" @input="(val)=>onInputChange(val, 'designation')" />
                <TextInput :label="'Описание'" @input="(val)=>onInputChange(val, 'description')" />
                <TextInput :label="'Теги'" @input="(val)=>onInputChange(val, 'tags')" />
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
export default class DocumentModal extends Vue {
    @Prop() public folderId; 
    private initialValues = {
        name: '',
        number: '',
        designation: '',
        description: '',
        tags: '',
    }
    
    public documentValues = this.initialValues;

    public onInputChange (value, inputName) {
        this.documentValues[inputName] = value                
    }
    public onClickSave () {
        // console.log({...this.documentValues, tags: this.documentValues.tags.split(','), FolderId: this.folderId});
        
        this.$store.dispatch('addDocument', {...this.documentValues, tags: this.documentValues.tags ? this.documentValues.tags.split(',') : [], folderId: this.folderId});
        // this.$emit('change-document', this.documentValues)
        this.$emit('closeDocModal');

    }
    public onClose () {
        this.documentValues = {...this.initialValues}
        this.$emit('closeDocModal');
    }   
}
</script>

<style scoped lang="scss">
@import '../../styles/edit-modal.styles.scss';

</style>