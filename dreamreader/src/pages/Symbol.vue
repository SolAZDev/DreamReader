<template lang="pug">
//- this is just an awful workaround.
.row 
  .col-lg-1
  .col-10
    .row(style="padding: 10px")
      .col-10
        h4 {{ Dream.symbol }}
      .col-2(v-if="Dream.id != -1")
        span(@click="SaveDream()") Save
      .col-12
        ol
          li(v-for="item in Dream.meanings", :key="item.id")
            p {{ item }}
  .col-lg-1
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SymbolModel } from "../models/models";
import * as DreamDB from "../utils/dreams";
import moment from "moment";
@Component
export default class Symbol extends Vue {
  db = DreamDB;
  Moment = moment;
  Dream = {
    id: -1,
    symbol: "Please find and select a dream.",
    meanings: ["The Symbols will be displayed here"],
  } as SymbolModel;
  created() {
    this.$root.$on(
      "setCurrDreamId",
      (id: number) => (this.Dream = this.loadDream(id))
    );
  }
  mounted() {
    const id = sessionStorage.getItem("CurrentDreamId");
    if (id != null) {
      this.Dream = this.loadDream(parseInt(id));
    }
  }

  loadDream(id: number): SymbolModel {
    // this.$root.$emit('test');
    let err = {
      id: 0,
      symbol: "404'd",
      meanings: ["Symbol not found??"],
    };
      this.SaveToHistory(id);
    const res = DreamDB.getDream(id);
    if (res != null) {
      return res;
    }
    return err;
  }
  SaveDream() {
    this.$store.dispatch("SaveDream", this.Dream.id);
  }
  SaveToHistory(id: number) {
      console.log(id);
    let lsh = localStorage.getItem("history");
    let newArray = new Array<number>();
    newArray.push(id)
    // debugger;
    if (lsh != "null") {
      const saved = JSON.parse(lsh) as number[];
    console.log(saved+"->");
    
      if(saved.includes(id)){saved.slice(saved.indexOf(this.Dream.id), 1);}
      console.log("->>"+saved);
      
      saved.forEach(s=>newArray.push(s));
    // debugger;
    }
    console.log(newArray);
    
    localStorage.setItem("history", JSON.stringify(newArray));
  }
}
</script>