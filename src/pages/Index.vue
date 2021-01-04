<template lang='pug'>
q-page(padding)
	#title
		h4 DreamReader
		small Dream Interpretation and Journal app
		p.text-negative Early Development Stages - Expect (but please report) Bugs!
	.row.q-gutter-y-md
		.col-6.col-md-3.column.items-center(v-for="link in mainLinks")
			q-btn(:to="link.to" stack :label="link.text" :icon="link.icon" style="width:90%; height:100%;")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
})
export default class PageIndex extends Vue {
	 mainLinks = [
		{icon:"calendar_today", to:"/Date", text:"Change Date"},
		{icon:"settings", to:"/Settings", text:"Settings"},
		{icon:"privacy_tip", to:"/Privacy", text:"Privacy"},
		{icon:"info", to:"/About", text:"About"},
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