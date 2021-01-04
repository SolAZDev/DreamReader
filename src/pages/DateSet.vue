<template lang="pug">
q-page(padding)
  .row.justify-center
    .col-12(style="padding-bottom:10px")
      .text-center Set Active date
      div.text-center Set the date
    .col-12.text-center.m-auto
      q-date(
        v-model="date", 
        today-btn,
        :title="literalDate", 
        :events="DatesWithDreams"
        mask="MM/DD/YYYY"
        @input="pickDate"
        subtitle="Active Date")
      
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import moment from 'moment';

@Component({
})
export default class DateSet extends Vue {
  date = this.activeDate;

  get literalDate(){
    return moment(this.date).format('MMM Do, YYYY')
  }
  
  get DatesWithDreams(){
    return (this.$store.getters.getSavedDates as string[]).map(date=>{return moment(date).format('YYYY/MM/DD')});
  }
  get activeDate(){
    return this.$store.getters.getActiveDate;
  }

  pickDate(date:string){
    if(date==null){return;}
    this.$store.dispatch("SetActiveDate",date)

  }
} 
</script>
