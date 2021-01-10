<template lang="pug">
//- this is just an awful workaround.
q-page(padding) 
	.col-10
		.row(style="padding: 10px")
			.col-10
				small Dream Symbol
				.text-h4 {{ Dream.symbol }}
			.col-2(v-if="Dream.id != -1", style="height: 100%")
				.self-center.justify-center(style="display: flex", v-if="!isSaved")
					q-btn(
						outlie,
						color="light-green-6",
						size="md",
						icon="save",
						@click="SaveDream()",
						style="margin: auto"
					)
				.self-center.justify-center(style="display: flex", v-if="isSaved")
					q-btn(
						outlie,
						color="negative",
						size="md",
						icon="close",
						@click="RemoveDream()",
						style="margin: auto"
					)

			.col-12(style="margin-top: 10px")
				span Meanings
				ol
					li(v-for="item in Dream.meanings", :key="item.id")
						p(style="text-alignment: justify") {{ item }}
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { SymbolModel } from '../models/models';
import * as DreamDB from '../utils/dreams';
@Component
export default class SymbolView extends Vue {
	db = DreamDB;
	saveable = true;
	Dream = {
		id: -1,
		symbol: 'Please find and select a dream.',
		meanings: ['The Symbols will be displayed here'],
	} as SymbolModel;
	created() {
		this.$root.$on(
			'setCurrDreamId',
			(id: number) => (this.Dream = this.loadDream(id))
		);
	}
	mounted() {
		const id = sessionStorage.getItem('CurrentDreamId');
		if (id != null) {
			this.Dream = this.loadDream(parseInt(id));
		}
	}

	get isSaved() {
		return this.$store.getters.dreamIsSavedOnActiveDate(this.Dream.id);
	}
	loadDream(id: number): SymbolModel {
		// this.$root.$emit('test');
		let err = {
			id: 0,
			symbol: "404'd",
			meanings: ['Symbol not found??'],
		};
		this.SaveToHistory(id);
		const res = DreamDB.getDream(id);
		if (res != null) {
			return res;
		}
		return err;
	}
	SaveDream() {
		console.log(
			'Saved Dream ' +
				this.Dream.symbol +
				' to ' +
				this.$store.getters.getActiveDate
		);

		this.$store.dispatch('SaveDream', this.Dream.id);
	}
	RemoveDream() {
		const opt = {
			date: this.$store.getters.getActiveDate,
			id: this.Dream.id,
		};
		this.$store.dispatch('RemoveDream', opt);
	}
	async SaveToHistory(id: number) {
		let lsh = await this.$store.getters.getLocalForage.getItem('history');
		let newArray = [];
		newArray.push(id);
		if (lsh != 'null') {
			const ogArr = Array.from(JSON.parse(lsh || '[]'));
			const saved = [...new Set(ogArr)];
			saved.forEach((s) => newArray.push(s));
		}
		const fArray = [...new Set(newArray)];
		this.$store.getters.getLocalForage.setItem('history', JSON.stringify(fArray.slice(0,50)));
	}
}
</script>
<style lang="sass">
h4, big
  margin: 0px
</style>