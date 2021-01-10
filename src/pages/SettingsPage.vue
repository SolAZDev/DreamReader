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
        .text-h6 Import Backup
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section.q-pa-md.q-gutter-y-md
        q-item(tag="label" v-ripple)
          q-item-section 
            q-item-label Open as Base64
          q-item-section(avatar)
            q-toggle(v-model="base64")
        q-file(outlined,
          v-model="file"
          label="Select Backup File",
          :accept="(base64?'.drb':'.drb.json')"
        )
          template(v-slot:append)
            q-icon(name="attach_file")
      q-card-actions
        q-btn(:disabled="file==null" @click="readInputJson()") Import Backup
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
      
      q-card-actions.m-center.text-center
        q-btn(flat @click="downloadOutputJson()") Save Backup
        q-btn(flat v-close-popup) Cancel


</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Watch } from 'vue-property-decorator'
import {Settings} from '../models/models'
import moment from 'moment'
// import localForage from 'localforage'
@Component
export default class SettingsPage extends Vue {
  settings= {darkMode: false} as Settings;
  base64=false;
  exportWindowOpen=false;
  importWindowOpen=false;
  file=null;
  importing=false;

  mounted() {
   this.settings=this.$store.getters.getSettings; 
  }

  get localForage():LocalForage{return this.$store.getters.getLocalForage;}
  
  @Watch('base64')
  resetFile(){this.file=null;}

  saveSettings(){
    this.$store.dispatch('SaveSettings', this.settings)
    // this.$root.$emit('ReloadSettings')
  }

  async outputJson(base64=false){
    let json={} as any;
    await this.localForage.iterate((v:string,k:string)=>{
      json[k]=v;
    });
    const res = JSON.stringify(json);
    return base64?btoa(res):res;
  }

  async downloadOutputJson(){
    const json = await this.outputJson(this.base64);
    const blob = new Blob([json], {type:this.base64?'text/plain':'application/json;charset=utf-8'});
    const url = URL.createObjectURL(blob)
    //Ye old hack
    var a = document.createElement('a');
    a.href=url;
    a.download='DreamReader-'+moment().format('MM-DD-YYYY-HH-MM')+(this.base64?'.drb':'.drb.json');
    a.click();
    a.remove();
  }

  async inputJson(input:string, base64=false){
    const json = JSON.parse(base64?atob(input):input);
    console.log('Whole JSON :: '+json)
    await Object.keys(json).forEach(async key=>{
      console.log('Parsing '+key);
      const stored = await this.localForage.getItem(key); 
      const imported = json[key];
      // Dream Dates
      if(key=='SavedDates'){
        let sDates = stored as string[] || []
        console.log('SavedDates found ['+sDates+']');
        const inDates = imported as string[] || []
        inDates.forEach(date=>{sDates.push(date);});
        const fDates = [...new Set(sDates)];
        const fsDates = fDates.sort((a:string,b:string)=>moment(a).diff(b)).reverse();
        console.log('Finalized Dates ['+fsDates+']');
        await this.localForage.setItem(key,fsDates);
      }
      //Dreams
      if(key.startsWith('D')){
        let dreams = stored as number[] || []
        console.log('Dreams found for '+key+' ['+dreams+']');
        const inDreams = imported as number[] || []
        inDreams.forEach(date=>{dreams.push(date);});
        const fDreams = [...new Set(dreams)];
        console.log('Finalized Dreams for '+key+' ['+fDreams+']');
        await this.localForage.setItem(key,fDreams);
      }
      // Note
      if(key.startsWith('N')){
        let note = stored as string || ''
        const inNote=imported as string || ''
        if(!note.includes(inNote)){ //Dupe Detection
          console.log('Note not duped?');
          const nNote = note+'<br/><br/><br/>'+inNote;
          await this.localForage.setItem(key,nNote);
        }
      }
      //Settings -- Ignored
      if(key=='settings'){
        console.log('Settings are ignored');
      }
    });
    this.$store.dispatch('ReloadSavedData');
  }

  async readInputJson(){ 
    this.importing=true;
    await this.inputJson(await (this.file as unknown as File).text(), this.base64);
    this.importing=false;
    this.file=null;
    this.importWindowOpen=false;
    
  }

  
}
</script>
<style lang="sass" scoped>
.w-100
  width: 100%
</style>