<template lang='pug'>
q-page(padding)
	.row.q-gutter-sm
		#title.col-12
			h4 DreamReader
			small Dream Interpretation and Journal app
			p.text-negative Early Development Stages - Expect (but please report) Bugs!
		.col-12
			.row.q-gutter-md
				.col(v-for="link in mainLinks")
					q-btn(:to="link.to" stack :label="link.text" :icon="link.icon", size="lg" style="padding:20px; width:100%; height:150px;")
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
					p Known Bugs
					p - Search bar may sometimes show result and then show 'no results'
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
})
export default class PageIndex extends Vue {
	 mainLinks = [
		{icon:"calendar_today", to:"/Date", text:"Change Active Date"},
		{icon:"settings", to:"/Settings", text:"Settings"},
		{icon:"privacy_tip", to:"/Privacy", text:"Privacy Policy"},
		{icon:"info", to:"/About", text:"About Dream Reader"},
	] 
}
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