<template>
  <div class="app-core">
      <transition name="fade-page">
      <div class="app__logout"
           v-if="$store.getters['user/isAuthenticated']"
            @click="signOut">
          <span class="app__mail">{{mail}}</span>
          <i class="material-icons">
              exit_to_app
          </i>
      </div>
      </transition>
      <nuxt/>
  </div>
</template>

<script>
    export default {
      computed:{
        mail(){
          const isntMobile = this.$store.getters['device/getDeviceType'].indexOf("mobile") === -1
          if(isntMobile)
            return this.$store.getters['user/getUser'].email
          return this.$store.getters['user/getUser'].email.length > 8 ? (this.$store.getters['user/getUser'].email.substring(0,7)+"...") : this.$store.getters['user/getUser'].email;
        }
      },
      methods:{
        async signOut(){
          try{
            await this.$fir.auth().signOut();

            this.$store.dispatch('user/resetUser');
            this.$store.dispatch('quizes/resetQuizes');
            this.$router.push({path: '/'});
          }catch(e){

          }
        }
      }
    };
</script>

<style lang="scss">
  html,body{
    margin:0;
  }
  div.app-core{
    width:100vw;
      max-width:100vw;
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
      .app__logout{
          position:fixed;
          top:5px;
          right:10px;
          z-index:99999;
          cursor:pointer;

          &:before{
              content:'';
              position:absolute;
              z-index:-1;
              width:200%;
              height:200%;
              background: #0f0c29;  /* fallback for old browsers */
              background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
              border-bottom: 4px dashed #fff;
              border-bottom-left-radius: 80%;
              transform:translateY(-30%) translateX(-30%);
              -webkit-box-shadow: inset 10px -7px 39px 5px rgba(0,0,0,0.34);
              -moz-box-shadow: inset 10px -7px 39px 5px rgba(0,0,0,0.34);
              box-shadow: inset 10px -7px 39px 5px rgba(0,0,0,0.34);
          }

          .app__mail{
              color:#fff;
              font-size:1em;
              position:relative;
              top:-9px;
              left:-10px;
          }
          i{
              font-size:1.9em;
              color: #fff;
          }
      }
  }
</style>

