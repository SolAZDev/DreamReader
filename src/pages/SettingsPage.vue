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
    q-card(style="width:75vw")
      q-card-section
        .text-h6.text-center Import Backup
      q-card-section.q-pa-md.q-gutter-y-md
        q-item(tag="label" v-ripple)
          q-item-section 
            q-item-label Open as Base64
          q-item-section(avatar)
            q-toggle(v-model="base64")
        q-item(tag="label" v-ripple)
          q-item-section 
            q-item-label Expose Raw Text
          q-item-section(avatar)
            q-toggle(v-model="useText")
        q-item(tag="label" v-if="useText")
          q-item-section
            q-item-label Backup Data
            q-input(v-model="rawText" filled  type="textarea")
        q-file(outlined, v-if="!useText"
          v-model="file"
          label="Select Backup File",
          :accept="(base64?'.drb':'.drb.json')"
        )
          template(v-slot:append)
            q-icon(name="attach_file")
            
      q-card-actions(align="around")
        q-btn(:disabled="(!useText && file==null) || (useText && rawText=='')" @click="readInputJson()" flat) Import Backup
        q-btn(flat v-close-popup) Cancel
 
  q-dialog(v-model="exportWindowOpen")
    q-card(style="width:75vw")
      q-card-section
        .text-h6.text-center Export Backup
      q-card-section.q-pa-md.q-gutter-y-md
        q-item(tag="label" v-ripple)
          q-item-section 
            q-item-label Save as Base64
          q-item-section(avatar)
            q-toggle(v-model="base64")
        q-item(tag="label" v-ripple)
          q-item-section 
            q-item-label Expose Raw Text
          q-item-section(avatar)
            q-toggle(v-model="useText")
        q-item(tag="label" v-if="useText")
          q-item-section
            q-item-label Backup Data
            q-input(v-model="rawText" filled  type="textarea")
              template(v-slot:append)
                q-icon(name="content_copy" ripple @click="copyData()")  
      q-card-actions(align="around")
        q-btn(flat @click="exportData()") Save Backup
        q-btn(flat v-close-popup) Cancel


</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Watch } from 'vue-property-decorator';
import { SavedDreamList, Settings } from '../models/models';
import moment from 'moment';
import { exportFile, copyToClipboard, Platform } from 'quasar';
import Saved from './Saved.vue';
@Component
export default class SettingsPage extends Vue {
  settings = { darkMode: false } as Settings;
  base64 = false;
  exportWindowOpen = false;
  importWindowOpen = false;
  file = null;
  importing = false;
  useText = false;
  ieTab = 'file';
  ieTabs = [
    { name: 'file', text: 'File' },
    { name: 'text', text: 'Text' },
  ];
  rawText = '';

  mounted() {
    this.settings = this.$store.getters.getSettings;
  }

  get localForage(): LocalForage {
    return this.$store.getters.getLocalForage;
  }

  @Watch('base64')
  resetFile() {
    this.file = null;
    this.rawText = '';
  }

  saveSettings() {
    this.$store.dispatch('SaveSettings', this.settings);
    // this.$root.$emit('ReloadSettings')
  }

  async exportData() {
    const data = await this.outputJson();
    if (this.useText) {
      this.rawText = data;
    } else {
      this.downloadOutputJson(data);
    }
  }

  async outputJson() {
    let json = {} as any;
    await this.localForage.iterate((v: string, k: string) => {
      json[k] = v;
    });
    const res = JSON.stringify(json);
    return this.base64 ? btoa(res) : res;
  }

  async downloadOutputJson(data: string) {
    if (Platform.is.android) {
      // window.saveAs()
    }
    if (Platform.is.desktop || Platform.is.electron) {
      const status = exportFile(
        'DreamReader-' +
          moment().format('MM-DD-YYYY-HH-MM') +
          (this.base64 ? '.drb' : '.drb.json'),
        data,
        this.base64 ? 'text/plain' : 'application/json;charset=utf-8'
      );
      console.log(status);
    }
  }

  async copyData() {
    const json = this.rawText != '' ? this.rawText : await this.outputJson();
    copyToClipboard(json).then(() => {
      console.log('Copied');
    });
  }

  async inputJson(input: string) {
    const json = JSON.parse(this.base64 ? atob(input) : input);
    console.log('Whole JSON :: ' + JSON.stringify(json));
    await Object.keys(json).forEach(async (key) => {
      console.log('Parsing ' + key);
      const stored = await this.localForage.getItem(key);
      const imported = json[key];
      // Dream Dates
      if (key == 'SavedDates') {
        let sDates = (stored as string[]) || [];
        console.log('SavedDates found [' + sDates + ']');
        const inDates = (imported as string[]) || [];
        inDates.forEach((date) => {
          sDates.push(date);
        });
        const fDates = [...new Set(sDates)];
        const fsDates = fDates
          .sort((a: string, b: string) => moment(a).diff(b))
          .reverse();
        console.log(key + ' = Finalized Dates [' + fsDates + ']');
        await this.localForage.setItem(key, fsDates);
      }
      //Dreams
      if (key.startsWith('D')) {
        let dreams = (stored as number[]) || [];
        console.log('Dreams found for ' + key + ' [' + dreams + ']');
        const inDreams = (imported as number[]) || [];
        inDreams.forEach((date) => {
          dreams.push(date);
        });
        const fDreams = [...new Set(dreams)];
        console.log('Finalized Dreams for ' + key + ' [' + fDreams + ']');
        await this.localForage.setItem(key, fDreams);
      }
      // Note
      if (key.startsWith('N')) {
        let note = (stored as string) || '';
        const inNote = (imported as string) || '';
        if (!note.includes(inNote)) {
          //Dupe Detection
          console.log('Note not duped?');
          const nNote = note + '<br/><br/><br/>' + inNote;
          await this.localForage.setItem(key, nNote);
        }
      }
      //Settings -- Ignored
      if (key == 'settings') {
        console.log('Settings are ignored');
      }
    });
    this.$store.dispatch('ReloadSavedData');
  }

  parseImportJson(input: string): SavedDreamList[] {
    let result = new Array<SavedDreamList>();
    const data = JSON.parse(this.base64 ? atob(input) : input) as any;
    console.log('Parsing JSON :: ' + JSON.stringify(data));
    (data[
      Object.keys(data).filter((key) => key == 'SavedDates')[0]
    ] as string[]).forEach((date) => {
      let dateData = { date: date } as SavedDreamList;
      dateData.dreams = data[
        Object.keys(data).filter((key) => key == 'D' + date)[0]
      ] as number[];
      dateData.note = data[
        Object.keys(data).filter((key) => key == 'N' + date)[0]
      ] as string;
      result.push(dateData);
    });
    return result;
  }

  async importSaveData(input: string) {
    const activeDate = this.$store.getters.getActiveDate;
    const parsedData = this.parseImportJson(input);
    await parsedData.forEach(async (date) => {
      console.log(JSON.stringify(date) + '--' + activeDate);
      await this.$store.dispatch('SetActiveDate', date.date);
      if (date.note != '' || date.note != null) {
        await this.$store.dispatch('SaveNote', date.note);
      }
      date.dreams.forEach(async (dream) => {
        const dDate = date.date;
        await this.$store.dispatch('SaveDream', { id: dream, date: dDate });
      });
    });
    this.$store.dispatch('SetActiveDate', activeDate);
  }

  async readInputJson() {
    this.importing = true;
    await this.importSaveData(
      this.useText
        ? this.rawText
        : await ((this.file as unknown) as File).text()
    );
    this.importing = false;
    this.file = null;
    this.importWindowOpen = false;
  }
}
</script>
<style lang="sass" scoped>
.w-100
  width: 100%
</style>
