<template lang="pug">
    div.container
        div(v-if="ActiveSymbol!=null" style="margin-top: 20px")
            
          h6.text-center Dream Symbol
          h4.text-center {{ActiveSymbol.symbol}}
          h6 Meanings
          p.text-justify(v-for="meaning in ActiveSymbol.meanings") {{meaning}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import * as SymbolsFile from "../../public/Symbols.json";
@Component
export default class SymbolView extends Vue {
  data() {
    return {
      ActiveSymbol: null
    }
  }
}
</script>