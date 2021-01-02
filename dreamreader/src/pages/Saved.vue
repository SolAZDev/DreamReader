<template lang="pug">
  q-page(padding)
    h5.text-center History  
    q-list(bordered, separator)
      q-item(clickable, v-ripple, v-for="dream in dreams", @click="goToDream(dream.id)")
        q-item-label {{dream.symbol}}

    
    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {SymbolModel}  from '../models/models';
import * as DreamDB from '../utils/dreams'
@Component
export default class Saved extends Vue {
  dreams = new Array<SymbolModel>();
  
  created() {
    this.GetHistory();
  }

  GetHistory(){
    const lsh = localStorage.getItem("history");
    if(lsh==null){return;}
    const dreamIds = JSON.parse(lsh) as number[];
    dreamIds.forEach(did => { //Did you though?
      this.dreams.push(DreamDB.getDream(did));
    });
  }
    goToDream(id:number){
      console.log(id);
      
      sessionStorage.setItem("CurrentDreamId", id.toString());
      this.$root.$emit('setCurrDreamId', id);
      this.$router.push("/Symbol");
    }
}
</script>
