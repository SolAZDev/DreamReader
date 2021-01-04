<template lang="pug">
  q-card
    q-card-section
      .row
        .col
          .text-subtitle2 Note for 
          .text-h6 {{literalDate}}
        .col-auto
          q-btn(round flat icon="edit" to="/NoteEdit")
    q-separator(inset)
    q-card-section.q-pt-none(style="padding-top:15px;")
      p.text-center(v-if="content==null||''") I didn't find anything for this date. Please, feel free to add notes and describe your dream!
      p(v-if="content!=null||''" v-html="content")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import moment from 'moment'
@Component({})
export default class NoteView extends Vue {
  content= null as any;
  mounted() {
    this.loadNote();
  }
  loadNote(){
    this.content = localStorage.getItem('N'+this.activeDate);
  }
  get activeDate(){
    return this.$store.getters.getActiveDate;
  }
  get literalDate(){
    return moment(this.activeDate).format("MMM Do, YYYY")
  }
}
</script>
<style lang="sass" scoped>
.q-card
  min-height: 86.5vh
</style>