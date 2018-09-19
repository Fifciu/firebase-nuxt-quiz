<template>
  <section class="container-auth" :class="{'finished': yetAnimed, 'exiting': exitAnim}">
    <div>
      <i class="material-icons fib-logo">
        fingerprint
      </i>
      <h1 class="title">
        Auth
      </h1>
      <div class="form">
        <form @submit.prevent="sign">
            <transition-group name="fade-page">
              <span
                      class="form-warning animated"
                      :key="1" v-if="!emailLength && email.length != 0 && wasInEmail">
                  <i class="material-icons">error</i>
                  At least 6 chars!
              </span>
                <span
                        class="form-warning animated"
                        :key="5" v-if="!emailProper && wasInEmail">
                  <i class="material-icons">error</i>
                  Bad form of email
              </span>
              <input
                      class="animated"
                      type="text"
                      :key="2"
                      name="email"
                      placeholder="Email"
                      v-model="email"
                      @blur="wasInEmail = true"
                      :class="{'bad': !emailLength && email.length != 0}"/>
            </transition-group>
          <transition-group name="fade-page">
              <span
                      class="form-warning animated"
                      :key="3" v-if="!passwordLength && password.length != 0 && wasInPassword">
                  <i class="material-icons">error</i>
                  At least 8 characters!
              </span>
            <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="password"
                    :class="{'bad': !passwordLength && password.length != 0}"
                    class="animated"
                    @blur="wasInPassword = true"
                    :key="4"/>
          </transition-group>
            <input type="submit" class="fib-button" value="Sign up/in"
                   :disabled="!passwordLength || !emailLength"/>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  transition: 'page',
  middleware: 'guest',
  data(){
    return {
      yetAnimed: false,
      arrowShowed: false,
      exitAnim: false,
      email: '',
      wasInEmail: false,
      password: '',
      wasInPassword: false,
      validated: false
    };
  },
  mounted(){
    setTimeout(() => {
      this.yetAnimed = true;
    }, 100);

    setTimeout(() => {
      this.arrowShowed = true;
    }, 2500);
  },
  computed:{
    emailLength(){
      return this.email.length >= 6;
    },
    passwordLength(){
      return this.password.length >= 8;
    },
    emailProper(){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.toLowerCase());
    }
  },
  methods:{
    async login(){
      try{
            await this.$fir.auth().signInWithEmailAndPassword(this.email, this.password);
            this.$router.push('/pick-quiz');
      } catch(e){
            console.log(error, 'err');
      }
    },
    async sign(){
      try{
        let result = await this.$fir.auth().createUserWithEmailAndPassword(this.email, this.password);

      } catch(error){
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if(errorCode == 'auth/email-already-in-use'){

        } else {
          alert(errorMessage);
        }
      }
      this.$fir.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          console.log(result, "Account created");
          console.log(this.$fir.auth().currentUser);
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if(errorCode == 'auth/email-already-in-use'){
          this.login();
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/global.scss';

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }

  section.container-auth{
    width:100%;
    min-height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align:center;

    transition:.6s;

    @mixin placeholder-style(){
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity:.8;
      font-family: 'Ubuntu';
      font-size:.82em;
    }
    div.form{
      padding-top: 20px;
      ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        @include placeholder-style();
      }
      ::-moz-placeholder { /* Firefox 19+ */
        @include placeholder-style();
      }
      :-ms-input-placeholder { /* IE 10+ */
        @include placeholder-style();
      }
      :-moz-placeholder { /* Firefox 18- */
        @include placeholder-style();
      }

      span.form-warning{

        margin-top:-10px;
        font-size:.9em;
        color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:bold;
          padding: 7px 0px 10px;
        i{
            padding-right:5px;
          color:red;
        }
      }

      input:not([type="submit"]){
        width:75%;
        padding: 10px 5px;
        margin-bottom: 10px;
        background: rgba(255,255,255,.2);
        border:0;
        padding-left: 15px;
        box-sizing: border-box;
        filter:blur(5px);
        transform:scale(.7);
        opacity:.7;
        transition:1.2s;
          color:#fff;
      }
      input[type="submit"]{
        cursor:pointer;
        &:disabled{
          opacity:.6;
          cursor:not-allowed;
        }
      }
      input.bad:not(:focus){
        background: linear-gradient(to right, rgba(255,0,0,.8), rgba(255,0,0,.1));
      }
    }

    .fib-logo{
      transform: scale(.6);

      transition: .8s;
      color: #ffcd18;
      opacity:0;
    }

    h1.title{
      font-size: 2.6em;
      margin:0;
      transition:.6s;
      transform: translateX(-50%);
      opacity:0;
      margin-bottom: -10px;
    }
    h2.subtitle{
      font-size: 1em;
      letter-spacing:2px;
      transition:.7s;
      transform: translateX(-50%);
      opacity: 0;
    }

    .fib-button{
      opacity:0;
      transform: translateX(-50%);
      transition: .8s;
      font-size:.8em;
    }

    &.finished{
      h1.title, h2.subtitle, .fib-button{
        transform: translateX(0%);
        opacity:1;
      }
      h2.subtitle{
        opacity:.7;
      }
      .fib-logo{
        animation: fib-anim 1s forwards;
        filter: blur(0px);
        opacity:1;
        font-size:12em;
      }
      div.form{
        input:not([type="submit"]){
          filter:blur(0px);
          opacity:1;
          transform:scale(1);
        }
      }
    }

    &.exiting{
      transform: scale(5);
    }

    .fib-intro-down{
      color:#fff;
      display:block;
      font-size: 2.5em;
      transform:translateY(300%);
      animation: intro-arrow 3s infinite;
      animation-delay: 1s;
      transition: 1s;
      opacity: .3;
      &.not-showed{
        opacity: 0;
        animation: none;
      }
    }

    @include for-size(tablets){
      h1.title{
        font-size:3.4em;
        margin:0;
      }
      h2.subtitle{
        font-size:1.1em;
        letter-spacing:4px;
      }
      .fib-button{
        font-size: 1em;
      }

      @keyframes fib-anim{
        0%{
          transform: scale(.6);
        }
        50%{
          transform: scale(1.2) translateY(-10%);
        }
        100%{
          transform: scale(.8) translateY(0%);
        }
      }
    }
  }

  @keyframes intro-arrow{
    0%{
      opacity:.3;
    }
    50%{
      opacity:.6;
      transform:translateY(200%);
    }
    100%{
      transform:translateY(300%);
      opacity:.3;
    }
  }

  @keyframes fib-anim{
    0%{
      transform: scale(.6);
    }
    50%{
      transform: scale(1) translateY(-10%);
    }
    100%{
      transform: scale(.65) translateY(0%);
      margin-bottom:-55px;
    }
  }
</style>