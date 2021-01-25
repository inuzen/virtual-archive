<template>
    <div class="edit-modal document-modal">
        <header class="modal-title">новый документ</header>
        <div class="modal-content">
            <p class="modal-info shelf">{{ currentShelf.name }}</p>
            <p class="modal-info">{{ folderName }}</p>
            <div class="form-container">
                <TextInput :label="'Инв №'" @input="(val) => onInputChange(val, 'number')" />
                <TextInput :label="'Обозначение'" @input="(val) => onInputChange(val, 'designation')" />
                <TextInput :label="'Название'" @input="(val) => onInputChange(val, 'name')" />
                <TextInput :label="'Тип документа'" @input="(val) => onInputChange(val, 'doc_type')" />
                <TextInput :label="'Описание'" @input="(val) => onInputChange(val, 'description')" />
                <TextInput :label="'Теги'" @input="(val) => onInputChange(val, 'tags')" />
                <div class="button-row">
                    <button @click="onClose" class="btn slim secondary">Отменить</button>
                    <button @click="onClickSave" class="btn slim primary">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { mapState } from 'vuex';
    import TextInput from '@/components/TextInput.vue';
    import { State, Action } from 'vuex-class';

    @Component({
        components: {
            TextInput,
        },
    })
    export default class DocumentModal extends Vue {
        @Prop() public folderId;
        @Prop() public folderName;
        @State currentShelf;
        @Action addDocument;
        private initialValues = {
            name: '',
            number: '',
            designation: '',
            doc_type: '',
            description: '',
            tags: '',
        };

        public documentValues = this.initialValues;

        public onInputChange(value, inputName) {
            this.documentValues[inputName] = value;
        }
        public onClickSave() {
            this.addDocument({
                ...this.documentValues,
                tags: this.documentValues.tags ? this.documentValues.tags.split(',') : [],
                folderId: this.folderId,
            });
            this.$emit('closeDocModal');
        }
        public onClose() {
            this.documentValues = { ...this.initialValues };
            this.$emit('closeDocModal');
        }
    }
</script>

<style scoped lang="scss">
    @import '../../styles/edit-modal.styles.scss';
</style>
