<template>
    <div class="input-wrapper">
        <label for="" class="input-label" :class="{disabled: disabled}">{{label}}</label>
        <input :disabled="disabled" type="text" :value="value" @input="$emit('input', $event.target.value)" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Model, Emit } from 'vue-property-decorator'

@Component
export default class TextInput extends Vue {
   
    @Prop(String) readonly label!: string
    @Prop(String) readonly value!: string
    @Prop(Boolean) public disabled!: boolean
    // @PropSync('value', {type: String}) public inputValue!: string
    
    // @Emit()
    // public onInputChange(e) {
    //     console.log(e);
    //     console.log(e.target.value);
        
    // return e.target.value
    // }
}

</script>

<style scoped lang="scss">

</style>
