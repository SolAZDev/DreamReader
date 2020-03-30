<template lang="pug">
    div
      div(v-if="ActiveSymbol!=null" style="margin-top: 20px").container
        .row
          .col-10
            small Dream Symbol
            h4 {{ActiveSymbol.symbol}}
          .col-2(align-v="center")
            button.btn.btn-success Save

          //- h6 Meanings
        p.text-justify(v-for="(meaning, index) in ActiveSymbol.meanings") {{index+1}}. {{meaning}}
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class SymbolView extends Vue {
  data() {
    return {
      ActiveSymbol: null,
      Saved: false
    };
  }
  GetSymbol() {
    console.log(this.$route.params.id);
    this.$data.ActiveSymbol = this.$store.getters.getSymbol(this.$route.params.id);
  }

  // mounted() { this.GetSymbol() }
  created() { this.GetSymbol() }

  get SymbolListReady(): boolean {
    if (this.$store.getters.getSymbolCount > 0) { return true } else { return false }
  }

  @Watch('SymbolListReady')
  @Watch('$route', { immediate: true, deep: true })
  CheckSymbol() { this.GetSymbol() }

  CheckSymbols2() { this.GetSymbol(); }

}
</script>
