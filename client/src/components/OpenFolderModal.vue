<template>
    <div class="folder-modal-wrapper">
            <div class="folder-title-container">            
        <div class="folder-title-highlight active">
        <div class="folder-title-wrapper">
                <div class="year">2020</div>
                <div class="name">name</div>
                <div class="number">number</div>
            </div>
        </div>
        <div class="edit-button-container">
            <div class="img-wrapper">
                <img src="../assets/icons/edit-icon.svg" alt="">
            </div>
        </div>
        </div>
        <div class="subfolder-row">
            <div class="subfolder"></div>
            <button class="btn primary add-subfolder-btn">+</button>
        </div>
        <button class="btn primary">Добавить документ</button>
        <div class="document-list-container">
            <div class="header"></div>
            <div class="dropdowns">
                <div @click="onShowDescription">
                    <span class="doc-name">123</span>
                    <span class="doc-designation">321</span>
                    <span class="doc-name">33</span>
                    <div class="tags">
                        <span class="tag">bruh</span>
                    </div>
                    <button class="delete-btn">-</button>
                </div>                  
                <p v-if="expand">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, necessitatibus soluta quibusdam similique exercitationem ad. Expedita fuga vel maxime repudiandae, facilis possimus unde natus!</p>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class OpenFolderModal extends Vue {
    public expand = false;
    
    public onShowDescription (e) {
        this.expand = !this.expand
    }
}
</script>

<style scoped lang="scss">
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
    }
    .name {
        text-align: start;
        width: 50%;
        font-size: 60px;
    }
    .number{
        margin-left: auto;
        margin-right: 20px;
        font-size: 40px;
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
</style>