<template lang="pug">
q-page(padding)
  .row
    .col-10
      .text-h6 Settings
    .col-2.text-center
      q-btn(@click="saveSettings()" icon="save")
  .q-pa-md
    q-list
      q-item(tag="label" v-ripple)
        q-item-section
          q-item-label Dark Mode
        q-item-section(avatar)
          q-toggle(v-model="settings.darkMode")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {Settings} from '../models/models'
@Component
export default class SettingsPage extends Vue {
  settings= {darkMode: false} as Settings;
  saveSettings(){
    this.$store.dispatch('SaveSettings', this.settings)
    this.$root.$emit('ReloadSettings')
  }
}
</script>
