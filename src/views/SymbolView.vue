<template lang="pug">
    div
        h5 Symbol
        p symbol descrioption
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as  SymbolsFile from "@/assets/Symbols.json";
@Component
export default class SymbolView extends Vue { }
</script>