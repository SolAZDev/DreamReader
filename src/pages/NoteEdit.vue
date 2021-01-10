<template lang="pug">
q-page(padding)
  .row
    .col
      .text-subtitle2 Note for 
      .text-h6 {{literalDate}}
    .col-auto
      q-btn(round flat icon="save" @click="saveNote()")
  q-editor(v-model="content",
    :toolbar="toolbar"
    )
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import moment from 'moment'
@Component({})
export default class NoteEdit extends Vue {
   content= null as any;
   toolbar=[
        ['bold','italic', 'strike', 'underline',
          {
            icon: this.$q.iconSet.editor.formatting,
            list: 'no-icon',
            options: ['p', 'h3', 'h4', 'h5', 'h6']
          }
        ]
      ];
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
  saveNote(){
    console.log("Saved");
    
    localStorage.setItem('N'+this.activeDate,this.content);
    this.$router.push('/Note');
    this.$q.notify({message:"Note saved!"});

  }
}
</script>
