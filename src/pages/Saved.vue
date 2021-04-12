<template lang="pug">
q-page(padding)
	.text-h5.text-center Saved Dreams
	.text-center All saved Symbols will appear here, by date. 
	br
	.text-center(v-if="SavedDreams.length<1") But I can't seem to find any saved dreams.
	q-list(bordered, separator v-if="PaginatedList.length>0")
		q-expansion-item(
			expand-separator,
			v-for="(dreams, index) in PaginatedList",
      v-model="openedDreams[index]"
			)

			template(v-slot:header)
				q-item-section {{Moment(dreams.date).format('MMMM Do, YYYY')}}
				q-item-section(side)
					q-btn(icon="notes" round flat @click="openNote(dreams.date)")

			q-card(v-if="openedDreams[index]")
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
	.flex.flex-center
		q-pagination(
      v-model="page"
      :max="MaxPage"
      :max-pages="5"
      direction-links
      boundary-links
      boundary-numbers
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    )
        
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { SymbolModel, SavedDreamList, LiveDreamList } from '../models/models';
import * as DreamDB from '../utils/dreams';
import moment from 'moment';
@Component
export default class Saved extends Vue {
  // SavedDreams = new Array<LiveDreamList>();
  Moment = moment;
  page = 1;
  itemsPerPage = 10;
  openedDreams = [false];
  mounted() {
    this.$store.dispatch('ReloadSavedData');
    this.openedDreams = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }

  get SavedDreams(): LiveDreamList[] {
    return this.DreamListConverter(this.$store.getters.getSavedDreamsList);
  }

  get PaginatedList(): LiveDreamList[] {
    return Array.from(this.SavedDreams).splice(
      this.itemsPerPage * (this.page - 1),
      this.itemsPerPage
    );
  }

  get MaxPage(): number {
    return Math.round(this.SavedDreams.length / this.itemsPerPage);
  }

  @Watch('page')
  pageChange() {
    console.log(this.page);
    this.openedDreams = new Array<boolean>(this.PaginatedList.length);
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
    // console.log(res);
    return res;
  }

  goToDream(id: number) {
    console.log(id);
    sessionStorage.setItem('CurrentDreamId', id.toString());
    this.$root.$emit('setCurrDreamId', id);
    this.$router.push('/Symbol');
  }

  openNote(date: string) {
    console.log(date);

    this.$store.dispatch('SetActiveDate', date);
    this.$q.notify(date + ' is now the Active Date');
    this.$router.push('/Note');
  }

  RemoveDream(date: string, id: number) {
    console.log('Removing ' + id + ' from ' + date);
    this.$store.dispatch('RemoveDream', { date, id });
  }
}
</script>
