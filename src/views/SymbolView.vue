<template lang="pug">
    div
      div(v-if="ActiveSymbol!=null" style="margin-top: 20px").container
        .row
          .col-11
            small Dream Symbol
            h4 {{ActiveSymbol.symbol}}
          .col-1(align-v="center")
            button.btn.btn-success(v-if="!Saved" @click="AddToFoundList")
              b-icon-plus
            button.btn.btn-danger(v-if="Saved" @click="RemoveFromFoundList")
              b-icon-x

          //- h6 Meanings
        p.text-justify(v-for="(meaning, index) in ActiveSymbol.meanings") {{index+1}}. {{meaning}}
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueCookie from "vue-cookie";
@Component
export default class SymbolView extends Vue {
  // this.$cookie = VueCookie;
  data() {
    return {
      ActiveSymbol: null,
      Saved: false
    };
  }
  GetSymbol() {
    console.log(this.$route.params.id);
    this.$data.ActiveSymbol = this.$store.getters.getSymbol(
      this.$route.params.id
    );
    if (
      this.$store.getters.getAllSymbolsFound.filter(
        saved => saved == this.$data.ActiveSymbol.id
      ).length > 0
    ) {
      this.$data.Saved = true;
    } else {
      this.$data.Saved = false;
    }
  }
  AddToFoundList() {
    this.$store.dispatch("AddSymbolToFoundList", this.$data.ActiveSymbol.id);
    this.$data.Saved = true;
    this.SaveCookies();
  }
  RemoveFromFoundList() {
    this.$store.dispatch(
      "RemoveSymbolFromFoundList",
      this.$data.ActiveSymbol.id
    );
    this.$data.Saved = false;
    this.SaveCookies();
  }
  SaveCookies() {
    this.$cookies.set(
      "SavedSymbols",
      JSON.stringify(this.$store.getters.getAllSymbolsFound)
    );
  }

  // mounted() { this.GetSymbol() }
  created() {
    this.GetSymbol();
  }

  get SymbolListReady(): boolean {
    if (this.$store.getters.getSymbolCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  @Watch("SymbolListReady")
  @Watch("$route", { immediate: true, deep: true })
  CheckSymbol() {
    this.GetSymbol();
  }

  CheckSymbols2() {
    this.GetSymbol();
  }
}
</script>
