<template>
    <div class="folder-modal-wrapper">
            <div class="folder-title-container">            
        <div class="folder-title-highlight active">
        <div class="folder-title-wrapper">
                <div class="year">2020</div>
                <div v-if="!folderEditMode" class="name">{{folderInfo.folderName}}</div>
                <div v-if="!folderEditMode" class="number">{{folderInfo.folderNumber}}</div>
                <div v-if="folderEditMode" class="name">
                    <TextInput @input="(val)=>onInputChange(val, 'folderName')" :value='folderInfo.folderName' />
                </div>
                <div v-if="folderEditMode" class="number">
                    <TextInput @input="(val)=>onInputChange(val, 'folderNumber')" :value='folderInfo.folderNumber' />
                </div>
            </div>
        </div>
        <div class="edit-button-container" @click="toggle">
            <div class="img-wrapper">
                <img src="../assets/icons/edit-icon.svg" alt="">
            </div>
        </div>
        </div>
        <div class="subfolder-row">
            <div class="subfolder"></div>
            <button class="btn primary add-subfolder-btn">+</button>
        </div>
        <button @click="onShowDocumentModal" class="btn primary">Добавить документ</button>
        <div class="document-list-container">
            <div class="header">
                <span>Инв №</span>
                <span>Обозначение</span>
                <span>Документ</span>
                <span>Стикер</span>
            </div>
            <div class="document-list">
                <Document/>
                <Document/>
            </div>
        </div>
        <md-dialog :md-active.sync="showDocumentModal"><DocumentModal @closeDocModal='closeDocModal'/></md-dialog>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import Document from '@/components/Document.vue'
import TextInput from '@/components/TextInput.vue'
import DocumentModal from '@/components/dialogs/DocumentModal.vue'

@Component({
  components: {
    Document,
    DocumentModal,
    TextInput,
    }
})
export default class OpenFolderModal extends Vue {
    public folderEditMode = false;
    public showDocumentModal = false;
    public folderInfo = {
        folderName: 'test',
        folderNumber: 'abc2d',
    }
    public onInputChange (value, inputName) {
        this.folderInfo[inputName] = value
        
        this.$emit('updateFolder', this.folderInfo);
    }
    public closeDocModal () {
        this.showDocumentModal=false;
    }
    public onShowDocumentModal () {
        this.showDocumentModal = true;
    }

    public editModeOn () {
        this.folderEditMode = true;
    }
    public toggle () {
        this.folderEditMode = !this.folderEditMode;
    }

}
</script>

<style lang="scss">
@import '../styles/colors.scss';

.folder-modal-wrapper{
    width: 100%;
    max-width: 1590px;
    height: 80%;
    box-shadow: $shadow;
    padding: 70px 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.folder-title-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
    .edit-button-container{
        margin-left: 30px;
        margin-right: 20px;
        cursor: pointer;
    }
}
.folder-title-highlight{
    width: 100%;
    background-color: #828282;
    border: 5px solid transparent;
    border-radius: 2px;
    &.active{
        border-color: $interactive;
    }
}
.folder-title-wrapper{
    margin: 0 10px;
    height: 130px;
    max-width: 100%;
    background-color: $white;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 14px 0;
    .year{
        font-size: 30px;
        line-height: 100%;
        color: #828282;
        writing-mode: vertical-lr;
        text-orientation: mixed;
        transform: rotate(180deg);
        margin-right: 20px;
    }
    .name {
        text-align: start;
        width: 50%;
        font-size: 60px;
        input {
            font-size: 60px;
        }
    }
    .number{
        margin-left: auto;
        margin-right: 20px;
        font-size: 40px;
        input {
            font-size: 40px;
            max-width: 130px;
        }
    }
    .input-wrapper{
        input{
            padding: 15px 0;
            min-height: 100px;
            height: 100%;
          
        }
    }
}

.subfolder-row{
    margin-bottom: 60px;
    .add-subfolder-btn{
        padding: 5px;
        min-width: 0;
        width: 45px;
        height: 45px;
        font-size: 63px;
        line-height: 0;
        font-weight: normal;
        cursor: pointer;
    }
}
.document-list-container{
    margin-top: 30px;
    width: 100%;
    .header{
        display: grid;
        grid-template-columns: 150px 420px 420px 240px;
        grid-gap: 30px;
        justify-items: start;
        font-size: 20px;
        line-height: 100%;
        color: $folder;
        font-weight: bold;
       
    }
    .document-list{
        overflow-y: auto;
    }
}
</style>