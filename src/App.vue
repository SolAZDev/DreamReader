<template lang="pug">
  div(id="app")
    b-navbar(type="dark" variant="primary")
      b-navbar-brand
        button.btn(@click.prevent="show = true")
          //- span.navbar-toggler-icon
          b-icon-three-dots-vertical
      SymbolsList.w-100
    .container-fluid
      router-view
    sidebar-menu-drawer(v-model="show")
      b-navbar(type="dark" variant="primary")
        b-navbar-brand.w-100.text-center(to="/") Dream Reader
      b-list-group
        b-list-group-item 
          b-icon-list-ul
          span Saved Dreams
        b-list-group-item(to="/about")
          b-icon-info-circle
          span About

  
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SymbolsList from './views/SymbolsList.vue'
import SidebarMenuDrawer from '@satmaxt/sidebar-menu-drawer'
@Component({
  components: {
    SymbolsList,
    SidebarMenuDrawer
  }
})
export default class App extends Vue {
  data() {
    return {
      show: false
    }
  }
  mounted() {
    this.$store.dispatch('LoadSymbols');
  }
}
</script>
<style lang="scss">
@import "~@satmaxt/sidebar-menu-drawer/src/assets/sidebar-menu-drawer";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
.sidebar-menu-drawer__body {
  width: 280px;
  .navbar {
    height: 64px;
  }
  .list-group {
    .list-group-item {
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
