<template>
    <section class="container" :class="{'finished': yetAnimed, 'container--intro': !isIntroFinished}">
        <transition name="frame" mode="out-in">
            <div v-if="isIntro" class="frame__intro" :key="1">
                <img class="intro__icon" :src="this.quiz.icon" :alt="this.quiz.name"/>
                <h1 class="intro__header">{{this.quiz.name}}</h1>
                <p class="intro__description">{{this.quiz.description}}</p>
                <button class="intro__button" @click="start">Start</button>
            </div>
            <template v-if="currentQuestion < questionAmount && !isIntro">
                <tmp-no-photo
                        v-if="!('photo' in quiz.questions[currentQuestion])"
                        :key="2"
                        :question="quiz.questions[currentQuestion]"
                        @choose="picked"
                />
                <tmp-left-photo
                        v-else-if="'photo' in quiz.questions[currentQuestion] && quiz.questions[currentQuestion].photo.template === 'left'"
                        :key="2"
                        :question="quiz.questions[currentQuestion]"
                        @choose="picked"
                />
                <tmp-right-photo
                        v-else-if="'photo' in quiz.questions[currentQuestion] && quiz.questions[currentQuestion].photo.template === 'right'"
                        :key="2"
                        :question="quiz.questions[currentQuestion]"
                        @choose="picked"
                />
            </template>
            <div v-else>
                FINISH
            </div>
        </transition>
    </section>
</template>

<script>
    import tmpNoPhoto from '@/components/question_templates/NoPhoto.vue';
    import tmpLeftPhoto from '@/components/question_templates/LeftPhoto.vue';
    import tmpRightPhoto from '@/components/question_templates/RightPhoto.vue';

  export default {
    transition: 'page',
    middleware: 'no-quiz-index',
    name: 'quiz',
    data(){
      return {
        yetAnimed: false,
        currentQuestion: 0,
        isIntro: true,
        isIntroFinished: false
      };
    },
    computed:{
      quiz(){
        return this.$store.getters['quizes/getQuizes'][+this.$store.getters['quizes/getCurrentQuiz']];
      },
      questionAmount(){
        return Object.keys(this.quiz.questions).length;
      }
    },
    mounted(){
      setTimeout(() => {
        this.yetAnimed = true;
      }, 100);
    },
    methods:{
      start(){
        this.isIntro = false;
        setTimeout(()=>{
          this.isIntroFinished = true;
        }, 1000);
      },
      picked(val){
        this.$store.dispatch('quizes/setAnswer', {
          key: this.currentQuestion,
          value: val,
          uid: this.$store.getters['user/getUid'],
          name: this.quiz.name
        }).then(r => {
          this.currentQuestion++;
        }).catch(err => {
          alert('blad');
        })
      }
    },
    components:{
      tmpNoPhoto,
      tmpLeftPhoto,
      tmpRightPhoto
    }
  };
</script>

<style lang="scss">
    .frame-enter-active, .frame-leave-active{
        transition: opacity .55s, transform 1s;
    }

    .frame-enter, .frame-leave-to{
        transform: scale(0.2) translateY(-45%);
        opacity:0;
    }

    .container{
        width:100%;
        min-height:100vh;
        display:flex;
        &.container--intro{
            align-items:center;
            justify-content:center;
        }
    }
    .frame__intro{
        text-align:center;
        transition: opacity .55s, transform 1s;

        &.out{
            transform: scale(0.2) translateY(-45%);
            opacity:0;
        }

        .intro__header, .intro__description{
            margin:0;
        }
        .intro__header{
            font-size:3em;
        }
        .intro__description{
            font-size:1em;
            letter-spacing: 2px;
            padding: 0 20px;
        }
        .intro__icon{
            max-width:200px;
        }
        .intro__button{
            -webkit-box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            -moz-box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            box-shadow: inset -1px -1px 51px -7px rgba(0,0,0,0.75);
            background: transparent;
            color:#fff;
            border:0;
            padding: 10px 30px;
            font-size:1.24em;
            margin-top:13px;
            cursor: pointer;
            position:relative;
            overflow:hidden;
            transition: background 2s, border-radius .7s;

            &:before{
                content:'';
                position:absolute;
                height:100%;
                width:100%;
                z-index:0;
                background: rgba(255,255,255,.7);
                bottom:0;
                left:0;
                transform: skew(40deg) translateX(-120%);
                transition:.6s;
            }
            &:hover{
                background: rgba(0,0,0,.5);
                border-radius:20px;
                &:before{
                    transform: skew(60deg) translateX(150%);
                }
            }
        }
    }
</style>