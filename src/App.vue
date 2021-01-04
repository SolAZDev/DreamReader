<template lang="pug">
#q-app
  router-view
  
</template>
<script lang="ts">
import { Settings } from './models/models';
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  created() {
   this.$store.dispatch('ReloadSavedData'); 
   this.$store.dispatch('LoadSettings');

   this.SettingsManager();
   this.$root.$on('ReloadSettings', ()=>this.SettingsManager());
  }

  SettingsManager(){
    const settings = this.$store.getters.getSettings as Settings;
    this.$q.dark.set(settings.darkMode);
  }
}
</script>
