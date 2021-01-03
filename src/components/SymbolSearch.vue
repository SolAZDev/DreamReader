<template lang="pug">
vSelect(
	label="symbol",
	:options="paginated",
	:filterable="false",
	@search="(q) => (search = q)",
	@open="onOpen",
	@close="onClose",
	@input="selectSymbol",
	:reduce="(symbol) => symbol.id"
)
	template(#list-footer, v-if="hasNextPage")
		li.loader(ref="load") Loading more symbols
</template>

<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Vue, Component } from 'vue-property-decorator';
import { SymbolModel } from '../models/models';
import * as DreamDB from '../utils/dreams';
import vSelect from 'vue-select';
@Component({
	components: { vSelect },
})
export default class SymbolSearch extends Vue {
	DreamDictionary = DreamDB.DreamsDictionary as SymbolModel[];
	limit = 50;
	offset = 0;
	search = '';
	observer = {} as IntersectionObserver;

	mounted() {
		this.$data.observer = new IntersectionObserver(this.infiniteScroll);
	}

	get filtered() {
		return this.DreamDictionary.filter((d) => d.symbol.includes(this.search));
	}
	get paginated() {
		return this.filtered.splice(0, this.limit);
	}
	get hasNextPage() {
		return this.paginated.length < this.filtered.length;
	}
	selectSymbol(id: number) {
		// console.log("Ey yo got some of dat "+id);
		sessionStorage.setItem('CurrentDreamId', id.toString());
		this.$root.$emit('setCurrDreamId', id);
		// let query = Object.assign({}, this.$route.query);
		void this.$router.push('/Symbol');
	}
	async onOpen() {
		if (this.hasNextPage) {
			await this.$nextTick();
			// this.observer.observe(this.$refs.load);
		}
	}

	onClose() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		// this.$data.observer.disconnect();
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
<style lang="sass">
@import "vue-select/src/scss/vue-select.scss"

.vs__selected
  color: #fff
</style>