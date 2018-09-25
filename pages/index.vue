<template>
  <section class="container" :class="{'finished': yetAnimed, 'exiting': exitAnim}">
    <div>
      <img class="fib-logo" src="/firebase.png" alt="Firebase Logo"/>
      <h1 class="title">
        Fuxt Quiz
      </h1>
      <h2 class="subtitle">
        Firebase Nuxt simple project
      </h2>
      <nuxt-link class="fib-button" to="/auth" @click="exitAnim = true">Start</nuxt-link>
      <i class="fas fa-angle-double-up fib-intro-down" :class="{'not-showed': !arrowShowed}"></i>
    </div>
  </section>
</template>

<script>
export default {
  transition: 'page',
  data(){
    return {
      yetAnimed: false,
      arrowShowed: false,
      exitAnim: false
    };
  },
  mounted(){
    setTimeout(() => {
      this.yetAnimed = true;
    }, 100);

    setTimeout(() => {
      this.arrowShowed = true;
    }, 2500);
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

  section.container{
    width:100%;
    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align:center;

    background: rgba(0,0,0,.2);
    transition:.6s;

    img.fib-logo{
      transform: scale(.6);
      filter: blur(5px);
      transition: .3s;
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
      background: rgba(0,0,0,0);
      h1.title, h2.subtitle, .fib-button{
        transform: translateX(0%);
        opacity:1;
      }
      h2.subtitle{
        opacity:.7;
      }
      img.fib-logo{
        animation: fib-anim 1s forwards;
        filter: blur(0px);
        opacity:1;
        width:80%;
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