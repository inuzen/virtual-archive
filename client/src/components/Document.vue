<template>
    <div class="document">
        <!-- <div class="document" :class="{ highlight: highlightedDocuments.includes(document.id) ? true : false }"> -->
        <div class="document__main-info" @click="onShowDescription">
            <span class="document__name">{{ document.number }}</span>
            <span class="document__designation">{{ document.designation }}</span>
            <span class="document__name">{{ document.name }}</span>
            <div class="document__tags">
                <div v-for="tag in document.tags" :key="tag" class="tag">
                    <span class="tag-text">{{ tag }}</span>
                    <div class="img-wrapper delete-tag">
                        <img src="../assets/icons/white-cross.svg" alt="" />
                    </div>
                </div>
                <div class="tag add-tag">+</div>
            </div>
            <div @click="onDocumentDelete" class="delete-button-container">
                <div class="img-wrapper">
                    <img src="../assets/icons/delete-icon.svg" alt="" />
                </div>
            </div>
        </div>
        <div v-if="expand" class="document__description-wrapper">
            <p class="title">Описание</p>
            <p>{{ document.description }}</p>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { State, Action } from 'vuex-class';

    @Component
    export default class Document extends Vue {
        @Prop(Object) public document;
        // @State highlightedDocuments;
        @Action deleteDocument;
        public tags = ['обработано', 'на проверке', 'very long  tag for some reason'];
        public expand = false;

        public onShowDescription(e) {
            this.expand = !this.expand;
        }

        public onDocumentDelete(e) {
            e.preventDefault();
            e.stopPropagation();
            this.deleteDocument(this.document.id);
        }
    }
</script>

<style scoped lang="scss">
    @import '../styles/colors.scss';

    .document {
        padding: 20px 0;
        border-bottom: 1px solid $disabled-border;
        &.highlight {
            // font-weight: bold;
        }
        font-size: 20px;
        line-height: 120%;
        &__main-info {
            display: grid;
            grid-template-columns: 150px 420px 420px 240px 60px;
            grid-gap: 30px;
            justify-items: start;
            cursor: pointer;
        }
        &__description-wrapper {
            text-align: left;
            .title {
                line-height: 100%;
                color: $folder;
                font-weight: bold;
            }
        }

        &__tags {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            .tag {
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
                margin-right: 10px;
                margin-bottom: 10px;
                cursor: default;
                .tag-text {
                    margin-right: 15px;
                }
                .delete-tag {
                    width: 100%;
                    max-width: 30px;
                    cursor: pointer;
                }
            }
            .add-tag {
                cursor: pointer;
                width: min-content;
                font-size: 35px;
            }
        }

        .img-wrapper {
            img {
                display: block;
            }
        }
    }
</style>
