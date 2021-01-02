<template lang="pug">
//- this is just an awful workaround.
.row 
    .col-lg-1
    .col-10
        .row(style="padding:10px;")
            .col-10
                h4 {{Dream.symbol}}
            .col-2(v-if="Dream.id!=-1")
                span Back
            .col-12
                ol
                    li(v-for="item in Dream.meanings" :key="item.id")
                        p {{item}}
    .col-lg-1
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {SymbolModel}  from '../models/models';
import * as DreamDB from '../utils/dreams'
@Component
export default class Symbol extends Vue {
    db = DreamDB;
    Dream = {
        id: -1,
        symbol: "Please find and select a dream.",
        meanings: [ "The Symbols will be displayed here"]
    } as SymbolModel;
    created() {
        this.$root.$on('setCurrDreamId', (id:number)=>this.Dream=this.loadDream(id))
    }
    mounted(){
        const id = sessionStorage.getItem('CurrentDreamId');
        if(id!=null){
            this.Dream=this.loadDream(parseInt(id));
        }
    }

    loadDream(id:number): SymbolModel{
        // this.$root.$emit('test');
        let err = {
            id: 0,
            symbol: "404'd",
            meanings: ["Symbol not found??"]
        }
        const res = DreamDB.getDream(id);
        if(res!=null){return res;}
        return err;
    }
}

</script>