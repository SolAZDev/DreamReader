<template lang="pug">
q-page(padding)
  .text-center
    .text-h5 About Dream Reader
    div Personal Dream Journal
    br
  p Dream Reader is a free and open source Dream interpretation and journal tool.
    | &nbsp; It was inspired by other dream interpretation apps and web sites that are (at the time of wiritng) unavailable, or broken.
    | &nbsp; This projects aims to be a drop-in replacement for said services, attempting to bring the same or more features, without compromsing user privacy.
    | &nbsp; The Dream Symbol Database is based on one of the more popular sources.
  p As stated above, Dream Reader is a FOSS project, you are free to contribute, remix and redistribute your own version.
    | &nbsp; But we would genuninely appreciate, if you would contribute to the project to make it better instead.
    | &nbsp; The #[a(:href="RepoLink" target="_blank") Main Repository is available at GitHub]. 
    | &nbsp; We implore you to please report any bugs on the repo via the issues tab. Any feedback and suggestions would be greatly appreciated as well.
  p This is still early software. While we're still ironing out bugs, sill remain. However, below you can find a list of known bugs. Any help is truly appreciated.
  br

  .text-h6.text-center Known Bugs
  .text-center(v-if="knownBugs.length==0") Seems we don't have known bugs at the time of this build. If you find one, please report it!
  q-list(bordered v-if="knownBugs.length>0")
    q-expansion-item(v-for="bug in knownBugs" expand--separator :icon="bug.icon", :label="bug.issue")
      q-separator
      q-card
        q-card-section.text-subtitle2 {{bug.statusType}}
        q-card-section {{bug.statusText}}

  .text-h6.text-center Known Features Wishlist
  .text-center(v-if="TodoWishlist.length==0") Seems we don't have known features wishlisted at the time of this build. Feel free to suggest some at the Github Repo!
  q-list(v-if="TodoWishlist.length>0")
    q-list-item(v-for="wish in TodoWishlist") 
      q-item-label {{wish}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class About extends Vue {
  RepoLink = 'https://github.com/SolAZDev/DreamReader/';
  knownBugs = [
    {
      icon: 'report_problem',
      issue: 'PWA Update Refresh',
      statusType: 'Under Investigation',
      statusText:
        "When an update is released, the PWA Version may not load properly (blank page) in this case we recommend deleting the page's cache, but NOT it's data.",
    },
  ];
  TodoWishlist = [
    'Dream Note Parser - Find any symbols in saved notes, leave as option in settings',
    'Themes, Modify Colors and Add options for iOS Styling',
  ];
}
</script>
<style lang="sass" scoped>
p
  text-align: justify

.q-card__section--vert
    text-align: justify
    padding: 4px 16px
</style>
