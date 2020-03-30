<template lang="pug">
    div
      //- v-select(label="symbol" :options="AllSymbols" :reduce="symbol => symbol" @input="SelectSymbol")
      v-select(label="symbol" :options="paginated" :filterable="false" @open="onOpen" @close="onClose" @search="query => search=query" @input="SelectSymbol")
        template(#list-footer v-if="hasNextPage")
          li.loader(ref="load") Loading more symbols
      //- .q-pa-md
      //-   q-list(:filter="filter")
      //-     q-input(ref="filter" filled v-model="filter" label="Search")
      //-     q-infinite-scroll(@load="onLoad" :offset="250")
      //-     q-item(v-for="(symbol, index) in Symbols" clickable v-ripple)
      //-       q-item-section {{symbol.symbol}}
      //- .container
        div(v-if="ActiveSymbol!=null" style="margin-top: 20px")
          h6 Dream Symbol
          h4 {{ActiveSymbol.symbol}}
          h6 Meanings
          p.text-justify(v-for="meaning in ActiveSymbol.meanings") {{meaning}}

        

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as SymbolsFile from "../../public/Symbols.json";
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
      ActiveSymbol: null,
      observer: null,
      limit: 25,
      search: ''
    };
  }
  mounted() {
    this.$data.observer = new IntersectionObserver(this.infiniteScroll);
  }
  created() {
    console.log("At least this works.");
    // eslint-disable-next-line @typescript-eslint/ban-types
    this.$data.AllSymbols = new Array<Symbol>()
    SymbolsFile.forEach(entry => {
      this.$data.AllSymbols.push(entry);
    });
    // this.$data.AllSymbols = SymbolsFile;
  }

  get filtered() {
    return this.$data.AllSymbols.filter(symbol => symbol.symbol.includes(this.$data.search));
  }
  get paginated() {
    return this.filtered.slice(0, this.$data.limit)
  }
  get hasNextPage() {
    return this.paginated.length < this.filtered.length
  }

  SelectSymbol(value) {
    console.log("Chose " + JSON.stringify(value));
    this.$data.ActiveSymbol = this.$data.AllSymbols.filter(entry => entry == value)[0];
  }
  async onOpen() {
    if (this.hasNextPage) {
      await this.$nextTick()
      this.$data.observer.observe(this.$refs.load)
    }
  }
  onClose() {
    this.$data.observer.disconnect()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async infiniteScroll([{ isIntersecting, target }]: any[]) {
    if (isIntersecting) {
      const ul = target.offsetParent
      const scrollTop = target.offsetParent.scrollTop
      this.$data.limit += 25
      await this.$nextTick()
      ul.scrollTop = scrollTop
    }
  }
}
</script>
<style lang="sass">
@import "vue-select/src/scss/vue-select.scss"
</style>
