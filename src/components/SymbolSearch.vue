<template lang="pug">
q-select(
	filled,
	use-input,
	clerable,
	label="Search Dreams"
	label-color="white",
	input-class="text-white"
	v-model="selected",
	:options="paginated",
	@filter="filterFn",
	@input="selectSymbol",
	emit-value,
	map-options
	popup-content-class="searchMenu")
	template(v-slot:no-option)
		q-item
			q-item-section No Results
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as DreamDB from '../utils/dreams';
import vSelect from 'vue-select';
@Component({
	components: { vSelect },
})
export default class SymbolSearch extends Vue {
	DB=DreamDB;
	DreamDictionary = DreamDB.SerchableDictionary as {value:number,label:string}[]
	selected=null;
	search = '';
	limit = 50;
	nextPage=2;
	loading=false;
	lastPage = Math.ceil(this.filtered.length/this.limit)

	mounted() {
		// this.$data.observer = new IntersectionObserver(this.infiniteScroll);
	}

	get filtered() {
		return this.DreamDictionary.filter((d) => d.label.toLocaleLowerCase().includes(this.search));
	}
	get paginated() {
		return this.filtered; //.splice(0, this.limit * (this.nextPage-1));
	}
	selectSymbol(id: number) {
		sessionStorage.setItem('CurrentDreamId', id.toString());
		this.$root.$emit('setCurrDreamId', id);
		if(this.$route.path!="/Symbol"){
			 this.$router.push('/Symbol');
		}
	}
	filterFn(val:string, update:any, abort:any){
		setTimeout(()=>{
			update(()=>{
				this.nextPage=2;
				this.search=val.toLowerCase();
				// this.options = this.DreamDictionary.filter(dream=>dream.label.toLowerCase().includes(val.toLowerCase())).splice(0,50);
			}),300
		})
	}
	onScroll({to, ref}:any){
		const lastIndex = this.paginated.length-1;
		if(!this.loading && this.nextPage<this.lastPage && to===lastIndex){
			this.loading=true;
			setTimeout(()=>{
				this.nextPage++
				this.$nextTick(()=>{
					ref.refresh();
					this.loading=false;
				})
			},500);
		}
	}
}
</script>
<style lang="sass">
.q-field__native
  color: white

.searchMenu
  min-height: 10vh !important
  max-height: 50vh !important

</style>