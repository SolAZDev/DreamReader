<template lang="pug">
q-page(padding)
	h5.text-center Saved Dreams
	.text-center All saved Symbols will appear here, by date. 
	.text-center(v-if="SavedDreams.length<1") But I can't seem to find any saved dreams.
	q-list(bordered, separator v-if="SavedDreams.length>0")
		q-expansion-item(
			expand-separator,
			icon="cal",
			v-for="dreams in SavedDreams",
			:label="Moment(dreams.date).format('MMMM Do, YYYY')"
		)
			q-card
				q-card-section
					q-list(bordered, rounded, separator)
						q-item(clickable, v-ripple, v-for="dream in dreams.dreams")
							q-item-section(@click="goToDream(dream.id)") {{ dream.symbol }}
							q-item-section(side)
								q-btn.text-red(
									flat,
									round,
									color="danger",
									icon="clear",
									@click="RemoveDream(dreams.date, dream.id)"
								)
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SymbolModel, SavedDreamList, LiveDreamList } from "../models/models";
import * as DreamDB from "../utils/dreams";
import moment from "moment";
@Component
export default class Saved extends Vue {
	// SavedDreams = new Array<LiveDreamList>();
	Moment = moment;
	mounted() {
		this.$store.dispatch("ReloadSavedData");
	}

	get SavedDreams(): LiveDreamList[] {
		return this.DreamListConverter(this.$store.getters.getSavedDreamsList);
	}

	DreamListConverter(loadedData: SavedDreamList[]): LiveDreamList[] {
		let res = new Array<LiveDreamList>();
		loadedData.forEach((ld) => {
			let tmp = {} as LiveDreamList;
			tmp.date = ld.date;
			tmp.dreams = new Array<SymbolModel>();
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

	RemoveDream(date: string, id: number) {
		console.log("Removing " + id + " from " + date);
		this.$store.dispatch("RemoveDream", { date, id });
	}
}
</script>
