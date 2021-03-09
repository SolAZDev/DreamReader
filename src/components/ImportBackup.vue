<template lang="pug">
q-card(style="width:75vw")
    q-card-section
      .text-h6.text-center Import Backup
    q-card-section.q-pa-md.q-gutter-y-md
      q-item(tag="label" v-ripple)
        q-item-section 
          q-item-label Expose Raw Text
        q-item-section(avatar)
          q-toggle(v-model="useText")
      //- q-item(tag="label" v-ripple v-if="useText")
        q-item-section 
          q-item-label Open as Base64
        q-item-section(avatar)
          q-toggle(v-model="base64")
      q-item(tag="label" v-if="useText")
        q-item-section
          q-item-label Backup Data
          q-input(v-model="rawText" filled  type="textarea")
      
      q-file(outlined, v-if="!useText && !$q.platform.is.capacitor"
          v-model="file"
          label="Select Backup File Web",
          accept=".drb, .drb.json"
      )
      q-input(outlined, v-if="!useText && $q.platform.is.capacitor"
          v-model="mobileFileLabel"
          label="Select Backup File Mobile",  
          @click="OpenCapFileSelector()"
      )
          template(v-slot:append)
          q-icon(name="attach_file")
          
      q-card-actions(align="around")
        q-btn(:disabled="(!useText && file==null) || (useText && rawText=='')" @click="readInputJson()" flat) Import Backup
        q-btn(flat v-close-popup) Cancel
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';
import { SavedDreamList } from '../models/models';
import validator from 'validator';
import Plugins, {
  Filesystem,
  FilesystemDirectory,
  FilesystemEncoding,
} from '@capacitor/core';
@Component
export default class ImportBackup extends Vue {
  useText = false;
  rawText = '';
  file = null;
  mobileFileLabel = '';

  parseJsonDreams(input: string): SavedDreamList[] {
    let result = new Array<SavedDreamList>();
    // let data = JSON.parse(
    //   this.be64regex.test(input) ? atob(input) : input
    // ) as any;
    let data = this.FileValidator(input);

    if (data != undefined) {
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
      console.log(result);
    }
    return result;
  }

  FileValidator(input: string) {
    let data = undefined as any;
    console.log(input);
    if (validator.isJSON(atob(input))) {
      data = JSON.parse(atob(input));
    } else if (validator.isJSON(input)) {
      data = JSON.parse(input);
    } else {
      this.$q.notify({
        type: 'negative',
        color: 'danger',
        message: 'Invalid format! Only DreamReader backups are readable.',
      });
    }
    return data;
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
    let strData = '';
    if (this.useText) {
      strData = this.rawText;
    } else {
      if (this.$q.platform.is.capacitor) {
        strData = (this.file as any).dataURI.split('base64,')[1];
      } else {
        //Assuming it's desktop/web
        strData = await ((this.file as unknown) as File).text();
      }
    }
    console.log(strData);
    await this.importSaveData(strData);
    this.$q.loading.isActive = false;
    this.$q.loadingBar.stop();
    this.file = null;
    this.$emit('CloseImport');
  }

  async OpenCapFileSelector() {
    const file = await (window as any).chooser.getFile();
    this.file = file;
    this.mobileFileLabel = file.name;
    console.log(file);
    // let selectedFile = await FileSelector.fileSelector({
    //   multiple_selection: false,
    //   ext: ['.drb', '.drb.json'],
    // });
    // console.log(selectedFile);
    // this.$q.notify(selectedFile);
    // if (this.$q.platform.is.android) {
    // }
  }
}
</script>
