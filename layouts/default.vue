<template>
  <div class="app-core">
      <nuxt/>
  </div>
</template>

<style lang="scss">
  html,body{
    margin:0;
  }
  div.app-core{
    width:100vw;
    min-height:100vh;
    overflow:hidden;
    background: #DA4453;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    h1,h2,h3,h4,h5,h6{
      font-family: 'Ubuntu', sans-serif;
      color:#fff;
    }

    p,span,quote,b,em,strong,u{
      font-family: 'Lora', serif;
      color:#f0f0f0;
    }
    a{
      font-family: 'Lora', serif;
    }
  }
</style>

