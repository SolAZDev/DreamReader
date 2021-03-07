<template lang="pug">
q-page(padding)
  .text-center.text-h6 Settings
  .q-pa-md
    q-list
      q-item(tag="label" v-ripple)
        q-item-section
          q-item-label Dark Mode
        q-item-section(avatar)
          q-toggle(v-model="settings.darkMode" @input="saveSettings()")
      q-item(tag="label" v-ripple @click="importWindowOpen=true")
        q-item-section
          q-item-label Import Backup
      q-item(tag="label" v-ripple @click="exportWindowOpen=true")
        q-item-section
          q-item-label Export Backup

  q-dialog(v-model="importWindowOpen")
    ImportBackup
 
  q-dialog(v-model="exportWindowOpen")
    ExportBackup

</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';
import { Settings } from '../models/models';
import ImportBackup from '../components/ImportBackup.vue';
import ExportBackup from '../components/ExportBackup.vue';

@Component({ components: { ImportBackup, ExportBackup } })
export default class SettingsPage extends Vue {
  settings = { darkMode: false } as Settings;
  exportWindowOpen = false;
  importWindowOpen = false;
  importing = false;

  mounted() {
    this.settings = this.$store.getters.getSettings;
  }

  get localForage(): LocalForage {
    return this.$store.getters.getLocalForage;
  }

  saveSettings() {
    this.$store.dispatch('SaveSettings', this.settings);
    // this.$root.$emit('ReloadSettings')
  }
}
</script>
<style lang="sass" scoped>
.w-100
  width: 100%
</style>
