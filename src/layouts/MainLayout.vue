<template lang="pug">
q-layout(view='hHh lpR fFf')
	q-header(elevated)
		SymbolSearch(style='width: vw; margin: auto')
		//- q-toolbar

	q-page-container
		router-view 

	q-footer.text-white(elevated)
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

<script lang="ts">
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
	padding:0 2.5vw
</style>
