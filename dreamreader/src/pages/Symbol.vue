<template lang="pug">
.container
    .row
        .col-10
            h4 {{Dream.symbol}}
        .col-2(v-if="Dream.id!=-1")
            span Back
        .col-12
            ol
                li(v-for="item in Dream.meanings" :key="item.id")
                    p {{item}}
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {SymbolModel}  from '../models/models';
import * as Dict from '../assets/Symbols.json';
@Component
export default class Symbol extends Vue {
    Dream = {
        id: -1,
        symbol: "Please find select a dream. This is a test text ",
        meanings: [ "Holy heck how did you get here?"]
    } as SymbolModel;
    DreamDictionary = Dict.default as SymbolModel[];
    created() {
        this.$root.$on('setCurrDreamId', id=>this.Dream=this.loadDream(id))
    }

    loadDream(id:number): SymbolModel{
        // this.$root.$emit('test');
        let err = {
            id: 0,
            symbol: "404'd",
            meanings: ["Symbol not found??"]
        }
        const findings = this.DreamDictionary.filter(d=>d.id===id)
        if(findings.length>0){
            return findings[0];
        }
        return err;
    }
    allDreams(){
        return Dict.default;
    }
}

</script>