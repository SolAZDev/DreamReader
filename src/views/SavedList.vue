<template lang="pug">
    div(style="margin-top:20px")
        h5.text-center Saved Symbols
        br
        div(v-if="SavedSymbols")
            b-list-group
                b-list-group-item(v-for="symbol in SavedSymbols" @click="GoToSymbol(symbol.id)" ) {{symbol.symbol}}
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class SavedList extends Vue {
  data() {
    return {
      SavedSymbols: []
    }
  }
  GetSymbols() { this.$data.SavedSymbols = this.$store.getters.getAllSavedSymbols; }
  get SymbolListReady(): boolean {
    if (this.$store.getters.getSymbolCount > 0) { return true } else { return false }
  }
  created() { this.GetSymbols(); }
  mounted() { this.GetSymbols(); }

  @Watch('SymbolListReady')
  @Watch('$route', { immediate: true, deep: true })
  CheckSymbol() { this.GetSymbols() }

  GoToSymbol(value) {
    this.$router.push("/symbol/" + value)
  }
}
</script>created