<template lang="pug">
q-page(padding) 
  .row
    .col
      .text-subtitle2 Note for 
      .text-h6 {{literalDate}}
    .col-auto
      q-btn(round flat icon="save" @click="saveNote()")
  q-editor(v-model="content",
    :toolbar="toolbar",
    :class="{'column reverse':invertEditor}"
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
@Component({})
export default class NoteEdit extends Vue {
  content = '';
  toolbar = [
    [
      'bold',
      'italic',
      'strike',
      'underline',
      {
        icon: this.$q.iconSet.editor.formatting,
        list: 'no-icon',
        options: ['p', 'h3', 'h4', 'h5', 'h6'],
      },
    ],
  ];
  mounted() {
    this.loadNote();
  }
  async loadNote() {
    const savedNote = await this.$store.getters.getLocalForage.getItem(
      'N' + this.activeDate
    );
    this.content = savedNote != null ? savedNote : '';
  }
  get invertEditor() {
    return this.$q.screen.width < this.$q.screen.sizes.lg;
  }
  get activeDate() {
    return this.$store.getters.getActiveDate;
  }
  get literalDate() {
    return moment(this.activeDate).format('MMM Do, YYYY');
  }
  saveNote() {
    this.$store.getters.getLocalForage.setItem(
      'N' + this.activeDate,
      this.content
    );
    this.$router.push('/Note');
    this.$q.notify({ message: 'Note saved!' });
  }
}
</script>
<style lang="sass">
.q-page
  display: flex
  flex-direction: column
  .q-editor
    flex-grow: 1
</style>
