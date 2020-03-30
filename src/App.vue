<template lang="pug">
  div(id="app")
    b-navbar(type="dark" variant="info")
      b-navbar-brand Dream Reader
      //- .row.w-100
        .col
      SymbolsList.w-100
      //- router-view 

  
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SymbolsList from './views/SymbolsList.vue'
@Component({
  components: {
    SymbolsList
  }
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch('LoadSymbols');
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
