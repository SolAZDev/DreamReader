<template lang="pug">
    div
      .q-pa-md
        q-list(:filter="filter")
          q-input(ref="filter" filled v-model="filter" label="Search")
          q-infinite-scroll(@load="onLoad" :offset="250")
          q-item(v-for="(symbol, index) in Symbols" clickable v-ripple)
            q-item-section {{symbol.symbol}}

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as SymbolsFile from "@/assets/Symbols.json";
@Component
export default class SymbolList extends Vue {
  name = "Home";
  metaInfo = {
    title: "DreamReader"
  };
  data() {
    return {
      Symbols: [],
      AllSymbols: [],
      filter: ''
    };
  }
  created() {
    console.log("At least this works.");
    SymbolsFile.forEach(entry => {
      this.$data.AllSymbols.push(entry)
    })
    // this.$data.AllSymbols = SymbolsFile;
  }
  onLoad(index: any, done: any) {
    console.log("Loading some more");
    setTimeout(() => {
      // if (this.$data.Symbols) {
      console.log(index);
      for (let i = index; i < 30; i++) {
        this.$data.Symbols.push(this.$data.AllSymbols[i]);
      }

      // }
    })
  }

}
</script>
