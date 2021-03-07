<template lang="pug">
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
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import { exportFile, copyToClipboard } from 'quasar';

@Component
export default class ExportBackup extends Vue {
  base64 = false;
  rawText = '';
  useText = false;

  get localForage(): LocalForage {
    return this.$store.getters.getLocalForage;
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
    const fileName =
      'DreamReader-' +
      moment().format('MM-DD-YYYY-HH-MM') +
      (this.base64 ? '.drb' : '.drb.json');
    const mimeType = this.base64
      ? 'text/plain'
      : 'application/json;charset=utf-8';
    if (this.$q.platform.is.capacitor) {
    }
    if (this.$q.platform.is.desktop || this.$q.platform.is.electron) {
      const status = exportFile(fileName, data, mimeType);
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
}
</script>
