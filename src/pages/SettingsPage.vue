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
    if (Platform.is.cordova) {
      let outUri = '';
      (window as any).OurCodeWorld.Filebrowser.createFileDialog({
        success: function (output: Array<any>) {
          if (!output.length) {
            // No file was created
            return;
          }

          console.log(output);
          outUri = JSON.stringify(output);
          // Array with the imaginary created file (is up to you how to create it)
          // ["file:///storage/emulated/0/myfile.txt"]
        },
        error: function (e: any) {
          console.error('Error calling Hello Plugin', e);
        },
      });
      this.$q.notify(outUri);
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
    this.rawText = this.rawText != '' ? this.rawText : await this.outputJson();
    copyToClipboard(this.rawText).then(() => {
      this.$q.notify('Copied!');
      console.log('Copied');
    });
  }

  parseJsonDreams(input: string): SavedDreamList[] {
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
    const parsedData = this.parseJsonDreams(input);
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
      this.$q.loadingBar.increment(
        parsedData.indexOf(date) / parsedData.length
      );
    });
    this.$store.dispatch('SetActiveDate', activeDate);
    this.$q.notify('Import Complete!');
  }

  async readInputJson() {
    this.$q.loading.isActive = true;
    this.$q.loadingBar.start();
    await this.importSaveData(
      this.useText
        ? this.rawText
        : await ((this.file as unknown) as File).text()
    );
    this.$q.loading.isActive = false;
    this.$q.loadingBar.stop();
    this.file = null;
    this.importWindowOpen = false;
  }
}
</script>
<style lang="sass" scoped>
.w-100
  width: 100%
</style>
