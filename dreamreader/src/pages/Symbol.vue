<template lang="pug">
//- this is just an awful workaround.
q-page(padding) 
	.col-10
		.row(style="padding: 10px")
			.col-10
				small Dream Symbol
				h4 {{ Dream.symbol }}
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
import { Vue, Component } from "vue-property-decorator";
import { SymbolModel } from "../models/models";
import * as DreamDB from "../utils/dreams";
import moment from "moment";
@Component
export default class Symbol extends Vue {
	db = DreamDB;
	saveable = true;
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

	get isSaved() {
		return this.$store.getters.dreamIsSavedOnActiveDate(this.Dream.id);
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
		console.log(
			"Saved Dream " +
				this.Dream.symbol +
				" to " +
				this.$store.getters.getActiveDate
		);

		this.$store.dispatch("SaveDream", this.Dream.id);
	}
	RemoveDream() {
		const opt = {
			date: this.$store.getters.getActiveDate,
			id: this.Dream.id,
		};
		console.log(
			"Saved Dream " +
				this.Dream.symbol +
				" to " +
				this.$store.getters.getActiveDate +
				"::::" +
				JSON.stringify(opt)
		);
		this.$store.dispatch("RemoveDream", opt);
	}
	SaveToHistory(id: number) {
		let lsh = localStorage.getItem("history");
		let newArray = new Array<number>();
		newArray.push(id);
		if (lsh != "null") {
			const saved = [...new Set(JSON.parse(lsh))] as number[];
			saved.forEach((s) => newArray.push(s));
		}
		console.log(newArray);
		localStorage.setItem("history", JSON.stringify(newArray));
	}
}
</script>
<style lang="sass">
h4, big
  margin: 0px
</style>