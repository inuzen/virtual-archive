<template>
    <div class="edit-modal document-modal">
        <header class="modal-title">новый документ</header>
        <div class="modal-content">
            <p class="modal-info shelf">НТВ ПРОМЕТЕЙ №1</p>
            <p class="modal-info">Папка №66666</p>
            <div class='form-container'>
                <TextInput :label="'Инв №'" @input="(val)=>onInputChange(val, 'docNumber')"  />
                <TextInput :label="'Обозначение'" @input="(val)=>onInputChange(val, 'docDesignation')" />
                <TextInput :label="'Название'" @input="(val)=>onInputChange(val, 'docName')" />
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

import TextInput from '@/components/TextInput.vue'

@Component({
  components: {
    TextInput,
    }
})
export default class DocumentModal extends Vue {
    private initialValues = {
        docName: '',
        docNumber: '',
        docDesignation: '',
    }
    
    public documentValues = this.initialValues;

    public onInputChange (value, inputName) {
        this.documentValues[inputName] = value                
    }
    public onClickSave () {
        this.$emit('change-document', this.documentValues)
    }
    public onClose () {
        this.documentValues = {...this.initialValues}
        this.$emit('closeDocModal');
    }   
}
</script>

<style scoped lang="scss">
@import '../../styles/edit-modal.styles.scss'

</style>