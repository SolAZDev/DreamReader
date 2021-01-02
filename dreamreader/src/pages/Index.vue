<template lang='pug'>
q-page(padding)
	.row.q-gutter-sm
		#title.col-12
			h1 DreamReader
			small Dream Interpretation and Journal app
			p.text-negative Early Development Stages - Expect (but please report) Bugs!
		.col
			q-card
				q-card-section
					p Please use the search bar above to look for your dream symbols.
					p You can save them them to your list. You can also manage daily lists from the Saved tab.
					p You can also see previously seen symbols in the History tab
		.col
			q-card
				q-card-section
					p This project is completely open source, and open to contributions.
					p If you find a bug, have some suggestions, or would like to colaborate, Please feel free make your PR requests.
		.col
			q-card
				q-card-section
					p New Features Coming!
					p New Features from the Wishlist are Notes per-day, setting the active date, dark mode.
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import ExampleComponent from "components/ClassComponent.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
	components: { ExampleComponent },
})
export default class PageIndex extends Vue {}
</script>
<style lang="sass">
#title
	text-align: center
	p
		text-align: center
	h1:
		margin: 1px

p
	text-align: justify
</style>