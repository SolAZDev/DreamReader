<template lang="pug">
  div(style="margin-top:20px;").container
    div
      div.text-center
        h4 Had a dream?
        h6 Let's find out what it means!
        p Search in specific parts and put the pieces together!

      b-row.text-center
        b-col
          div(style="background: #5CC9FF; border-radius: 5px;" @click="GoTo('/saved')")
            h2
              b-icon-list-task
            h5 Check your saved dreams
        b-col
          div(style="background: #84FF80; border-radius: 5px;" @click="GoTo('/about')")
            h2
              b-icon-info-circle
            h5 Learn about this project

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  GoTo(sub: string) {
    this.$router.push(sub);
  }

}
</script>
