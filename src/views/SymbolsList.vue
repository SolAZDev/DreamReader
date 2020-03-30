<template lang="pug">
    div
      v-select(label="symbol" :options="paginated" :filterable="false" @open="onOpen" @close="onClose" @search="query => search=query" @input="SelectSymbol" :reduce="symbol=>symbol.id")
        template(#list-footer v-if="hasNextPage")
          li.loader(ref="load") Loading more symbols

        

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class SymbolList extends Vue {
  name = "Home";
  metaInfo = {
    title: "DreamReader"
  };
  data() {
    return {
      observer: null,
      limit: 25,
      search: ""
    };
  }
  mounted() {
    this.$data.observer = new IntersectionObserver(this.infiniteScroll);
  }
  get filtered() {
    return this.$store.getters.filterSymbols(this.$data.search);
  }
  get paginated() {
    return this.filtered.slice(0, this.$data.limit);
  }
  get hasNextPage() {
    return this.paginated.length < this.filtered.length;
  }

  SelectSymbol(value) {
    console.log("Chose " + value);
    this.$router.push("/symbol/" + value)
  }
  async onOpen() {
    if (this.hasNextPage) {
      await this.$nextTick();
      this.$data.observer.observe(this.$refs.load);
    }
  }
  onClose() {
    this.$data.observer.disconnect();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async infiniteScroll([{ isIntersecting, target }]: any[]) {
    if (isIntersecting) {
      const ul = target.offsetParent;
      const scrollTop = target.offsetParent.scrollTop;
      this.$data.limit += 25;
      await this.$nextTick();
      ul.scrollTop = scrollTop;
    }
  }
}
</script>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
.vs__search {
  color: white;
}
</style>
