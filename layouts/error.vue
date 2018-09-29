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
      <div class="error">
          <div class="error__container">
              <i class="material-icons error__icon">
                  terrain
              </i>
              <h1 class="error__header">Page not found</h1>
              <h3 class="error__subheader">Sorry</h3>
              <button class="error__button fib-button--special" @click="$router.push({path: $store.getters['user/isAuthenticated'] ? '/pick-quiz' : '/auth'})">Back</button>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
      computed:{
        mail(){
          return this.$store.getters['user/getUser'].email.length > 8 ? (this.$store.getters['user/getUser'].email.substring(0,7)+"...") : this.$store.getters['user/getUser'].email;
        }
      },
      methods:{
        async signOut(){
          try{
            await this.$fir.auth().signOut();

            this.$store.dispatch('user/resetUser');
            this.$router.push({path: '/'});
          }catch(e){

          }
        }
      }
    };
</script>

<style lang="scss">
    .error{
        display:flex;
        width:100%;
        height:100%;
        min-height:100vh;
        align-items:center;
        justify-content:center;
        text-align:center;
        h1,h3{
            margin:0;
        }
        .error__icon{
            color: #eee;
            font-size: 10em;
        }
        .error__header{
            margin-top: -32px;
        }
        .error__subheader{
            padding: 5px 0px 15px;
            text-transform:uppercase;
            opacity: .7;
        }
        .error__button{
            margin-top:5px;
            padding: 8px 18px;
        }
    }
</style>

