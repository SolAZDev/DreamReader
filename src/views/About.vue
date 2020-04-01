<template lang="pug">
  div(style="margin-top:20px").about
    div.text-center
      h3 Dream Reader
      small Open Source Dream Meaning Web App
      br
      small Originally Developed by SolAZDev
    br
    div#about
      b-row
        b-col
          h6 What is this?
          p Dream Reader is an Open Source, Dreams meaning & interpretation Progressive Web App. It is designed with quick searches in mind, to help figure out what a dream could mean quickly.
        b-col
          h6 Why make it?
          p Personally, I had the idea when I noticed my go to source for dream interpretaion, had taken down their mobile apps, and their website began to show several issues that affected usability.
          p This project was developed as an PWA so it could be 'installed' into multiple devices without taking up space.
        b-col
          h6 What does it use?
          p For Dream Menaings, DreamReader originally started by using 
            a(href="https://dreammoods.com/" target="_blank") DreamMood's 
            span menaings as a base. However, this project is open to contributions, and hopes to grow beyond the prexisting base.
          p Technically, DreamReader uses 
            a(href="https://vuejs.org/" target="_blank") VueJS 
            span as a framework, with Vuex & Vue-Router. As of version 1.2 it also uses Vue-Cookies.
      b-row
        b-col
          h6 How can I contribute?
          p If you wish to contribute to the development, feel free to fork the 
            a(href="https://github.com/SolAZDev/DreamReader" target="_blank") Github repo 
            span and submit a pull request. If you wish to report a bug or issue, suggest an improvement, or suggest a dream interpretation, you can sumbit an 
            a(href="https://github.com/SolAZDev/DreamReader/issues" target="_blank") issue on the repo. 
            span However, at this time you could donate, 
            a(href="https://www.paypal.me/SolAZDev" target="_blank") via PayPal. 
            span Bitcoin and other currencies might come later. 
            br
            span Regardless, all contributions are welcomed and much appreciated.
        b-col
          h6 Privacy Policy
          p DreamReader does 
            b NOT 
            span collect any session data, nor information that could identify you, and much less sell or give out your data.
            br
            span The only data it stores are your Saved Dream Symbols, and it does so as an array, in a cookie that each time it is updated, expires in 7 days.            

</template>
<style lang="scss" scoped>
#about {
  h6 {
    text-align: center;
    font-weight: bold;
  }
  p {
    text-align: justify;
  }
}
</style>
