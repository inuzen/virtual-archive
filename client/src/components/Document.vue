<template>
            <div class="document">
                <div class="document__main-info" @click="onShowDescription">
                    <span class="document__name">123</span>
                    <span class="document__designation">321</span>
                    <span class="document__name">33</span>
                    <div class="document__tags">
                        <div v-for="tag in tags" :key="tag" class="tag">
                            <span class="tag-text">{{tag}}</span>
                            <div class="img-wrapper delete-tag">
                                <img src="../assets/icons/white-cross.svg" alt="">
                            </div>
                        </div>
                        <div class="tag add-tag">+</div>
                    </div>
                    <div class="delete-button-container" >
                        <div class="img-wrapper">
                            <img src="../assets/icons/delete-icon.svg" alt="">
                        </div>
                    </div>
                </div>
                <div v-if="expand" class="document__description-wrapper">
                    <p class="title">Описание</p>
                    <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, necessitatibus soluta quibusdam similique exercitationem ad. Expedita fuga vel maxime repudiandae, facilis possimus unde natus!</p>
                </div>            
            </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { DocumentClass } from '@/classes/document.ts'


@Component
export default class Document extends Vue {
    // @Prop(Object) public document!:  DocumentClass
    public tags = ['обработано', 'на проверке', 'very long fucking tag for some reason'];
    public expand = false;
    
    public onShowDescription (e) {
        this.expand = !this.expand
    }

}
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.document{
    padding: 20px 0;
    border-bottom: 1px solid $disabled-border;
    font-size: 20px;
    line-height: 120%;
    &__main-info{
        display: grid;
        grid-template-columns: 150px 420px 420px 240px 30px;
        grid-gap: 30px;
        justify-items: start;
        cursor: pointer;
    }
    &__description-wrapper{
        text-align: left;
        .title{
            line-height: 100%;
            color: $folder;
            font-weight: bold;
        }
    }

    &__tags {
        .tag{
            background-color: $sticker;
            padding: 5px;
            border-radius: 5px;
            font-size: 20px;
            text-align: left;
            font-weight: bold;
            width: max-content;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            cursor: default;
            .tag-text{
                margin-right: 15px;
                
            }
            .delete-tag{
                width: 100%;
                max-width: 30px;
                cursor: pointer;
            }

        }
        .add-tag{
            cursor: pointer;
            width: min-content;
            font-size: 35px;
        }
    }

    .img-wrapper{
        img{
            display: block;
        }
    }

}
</style>