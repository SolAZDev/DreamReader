<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated)
    q-toolbar
      q-btn(flat, dense, round, icon='menu', aria-label='Menu', @click='leftDrawerOpen = !leftDrawerOpen')
      SymbolSearch(style="width:90vw; margin:auto;")

  q-drawer(v-model='leftDrawerOpen', show-if-above, bordered, content-class='bg-grey-1')
    q-list
      q-item-label.text-grey-8(header) Navigation
        
      EssentialLink(v-for='link in essentialLinks', :key='link.title', v-bind='link').
        
        
  q-page-container
    router-view.
      
      
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import SymbolSearch from 'components/SymbolSearch.vue';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: { EssentialLink, SymbolSearch },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;

  created() {
    this.$root.$on('test', ()=> console.log("Yep, got et"));
  }
}
</script>
