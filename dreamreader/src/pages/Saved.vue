<template lang="pug">
q-page(padding)
  h5.text-center Saved Dreams
  q-list(bordered, separator)
    q-expansion-item(
      expand-separator,
      icon="cal",
      v-for="dreams in SavedDreams",
      :label="dreams.date"
    )
      q-card
        q-card-section
          q-list(bordered, separator)
            q-item(
              clickable,
              v-ripple,
              v-for="dream in dreams.dreams",
              @click="goToDream(dream.id)"
            )
              q-item-label {{ dream.symbol }}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SymbolModel, SavedDreamList, LiveDreamList } from "../models/models";
import * as DreamDB from "../utils/dreams";
@Component
export default class Saved extends Vue {
  SavedDreams = new Array<LiveDreamList>();
  mounted() {
    this.$store.dispatch("ReloadSavedData");
    this.SavedDreams = this.DreamListConverter(this.$store.getters.getSavedDreamsList);
  }

  DreamListConverter(loadedData: SavedDreamList[]): LiveDreamList[] {
    let res = new Array<LiveDreamList>();
    loadedData.forEach((ld) => {
      let tmp = {} as LiveDreamList;
      tmp.date = ld.date;
      tmp.dreams=new Array<SymbolModel>();
      ld.dreams.forEach((dream) => tmp.dreams.push(DreamDB.getDream(dream)));
      res.push(tmp);
    });
    console.log(res);
    
    return res;
  }

  goToDream(id: number) {
    console.log(id);

    sessionStorage.setItem("CurrentDreamId", id.toString());
    this.$root.$emit("setCurrDreamId", id);
    this.$router.push("/Symbol");
  }
}
</script>
