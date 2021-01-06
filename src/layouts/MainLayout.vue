<template lang='pug'>
q-layout(view='hHh lpR fFf')
	q-header(elevated)
		q-toolbar
			SymbolSearch(style='width: 90vw; margin: auto')

	q-page-container
		router-view 

	q-footer.bg-gray-1.text-white(elevated)
		q-tabs(align='center', v-model='tab')
			q-route-tab.dText(
				v-for='tab in links',
				:key='tab.id',
				:name='tab.name',
				:to='tab.to',
				:label='tab.text',
				:icon='tab.icon',
				exact
			)
</template>

<script lang='ts'>
import SymbolSearch from 'components/SymbolSearch.vue';

import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: { SymbolSearch },
})
export default class MainLayout extends Vue {
	tab = 'home';
	links = [
		{ name: 'home', to: '/', text: 'Home', icon: 'home' },
		{ name: 'symbol', to: '/Symbol', text: 'Symbol', icon: 'cloud' },
		{ name: 'saved', to: '/Saved', text: 'Saved', icon: 'bookmarks' },
		{ name: 'notes', to: '/Note', text: 'Notes', icon: 'notes' },
		{ name: 'history', to: '/History', text: 'History', icon: 'history' },
		// {to:'/', text: 'Notes', icon:'cloud'}
	];

	created() {
		this.$root.$on('test', () => console.log('Yep, got et'));
	}
}
</script>
<style lang="sass" scoped>
.q-tab
	margin: auto
	@media (max-width: $breakpoint-xs-max)
		padding: 0 .2rem
	@media (max-width: $breakpoint-sm-max)
		padding: 0 .5rem
	@media (max-width: $breakpoint-md-max)
		padding:0 .75rem
	@media (min-width: $breakpoint-lg-min)
		padding:0 5vw
</style>