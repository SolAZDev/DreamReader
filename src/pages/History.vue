<template lang="pug">
	q-page(padding)
		.text-h5.text-center History  
		.text-center The last {{limit}} symbols you've opened, will appear here.
		.text-center(v-if="dreams.length<1") But it seems you haven't checked anything out.
		q-list(bordered, separator, v-if="dreams.length>0" style="margin-top:10px")
			q-item(clickable, v-ripple, v-for="dream in dreams", @click="goToDream(dream.id)")
				q-item-label 
					.text-h6 {{dream.symbol}}

		
		
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {SymbolModel}  from '../models/models';
import * as DreamDB from '../utils/dreams'
@Component
export default class History extends Vue {
	limit=50;
	dreams = new Array<SymbolModel>();
	created() {
		this.$root.$on('reloadHistory' , this.reloadHistory);
	}
	mounted() {
		this.reloadHistory();	
	}
	reloadHistory() {
		// this.dreams =this.$store.getters.getHistory;	
		const lsh = localStorage.getItem('history');
		if(lsh==null){return;}
		const dreamIds = JSON.parse(lsh) as number[];
		dreamIds.forEach(did => { //Did you though?
			this.dreams.push(DreamDB.getDream(did));
		});
	}
	goToDream(id:number){
		console.log(id);
		sessionStorage.setItem('CurrentDreamId', id.toString());
		this.$root.$emit('setCurrDreamId', id);
		this.$router.push('/Symbol');
	}
}
</script>
