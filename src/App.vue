<template lang="pug">
#q-app
  router-view
  
</template>
<script lang="ts">
import { Settings } from './models/models';
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  created() {
    this.$store.dispatch('initDB');
    this.$store.dispatch('LoadSettings');
    this.$store.dispatch('ReloadSavedData');
    this.$root.$on('ReloadSettings', () => this.SettingsManager());
    this.SettingsManager();
  }

  get settings() {
    return this.$store.getters.getSettings as Settings;
  }

  @Watch('settings.darkMode')
  onSettingsChange() {
    this.SettingsManager();
  }

  SettingsManager() {
    this.$q.dark.set(this.settings.darkMode);
  }
}
</script>
