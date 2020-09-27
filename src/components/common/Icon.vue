<template>
  <span class="icon" :class="{ 'is-right': isRight, 'is-left': isLeft, 'is-small':isSmall, 'is-large': isLarge}">
    <font-awesome-layers v-if="stack">
      <font-awesome-icon v-for="i in icon" :icon="i" :key="i"/>
    </font-awesome-layers>
    <font-awesome-layers v-else-if="stackText">
      <font-awesome-icon v-for="i in icon" :icon="i" :key="i"/>
      <font-awesome-layers-text :value="textValue"/>
    </font-awesome-layers>
    <font-awesome-icon v-else :icon="icon"/>
  </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Icon extends Vue {
        @Prop({type: Boolean, default: false}) private stack!: boolean;
        @Prop({type: Boolean, default: false}) private stackText!: boolean;
        @Prop() private textValue!: string;
        @Prop() private icon!: string | string[];
        @Prop({type: Boolean, default: false}) private isRight!: boolean;
        @Prop({type: Boolean, default: false}) private isLeft!: boolean;
        @Prop({type: Boolean, default: false}) private isSmall!: boolean;
        @Prop({type: Boolean, default: false}) private isLarge!: boolean;
    }
</script>
<style lang="scss" scoped>

</style>
