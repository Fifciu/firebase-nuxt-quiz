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
            <div v-else-if="currentQuestion >= questionAmount && !isIntro" class="frame__finish" :key="5">
                <img class="finish__icon" :src="this.quiz.icon" :alt="this.quiz.name"/>
                <h1 class="finish__header">{{this.quiz.name}}</h1>
                <h3 class="finish__subheader">Gratulations! You have finished quiz. Check your results in table below...</h3>
                <div class="finish__table">
                    <div class="table__question" v-for="i in results" :key="i.question"
                         :class="{'answer--proper': i.isProper, 'answer--bad': !i.isProper}">
                        <span class="question" key="1">
                            <b>Q:</b> {{i.question}}
                        </span>
                        <span class="answer" key="2">
                            <b>A: </b>{{i.answer}}
                        </span>
                    </div>
                    <div class="table__points">{{percent}}% of good answers</div>
                </div>
                <button class="table__btn" @click="backToQuizes">Back to quizes</button>
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
        isIntroFinished: false,
        results: {},
        percent: 0
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
    watch:{
      currentQuestion(n,o){
        if(n >= this.questionAmount){
          const answers = this.$store.getters['quizes/getAnswers'];
          const baseObj = [];
          let isp = 0;
          for(let i = 0, len = answers.length; i < len; i++){
            baseObj[i] = {
              question: this.quiz.questions[i].text,
              answer: this.quiz.questions[i].answears[answers[i]],
              isProper: answers[i]==0
            };
            if(baseObj[i].isProper) isp++;
          }

          this.results = baseObj;
          this.percent = Math.round((isp/answers.length)*10000)/100;
        }
      }
    },
    methods:{
      start(){
        this.isIntro = false;
        this.$store.commit('quizes/clearAnswears');
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
         // alert('blad');
        })
      },
      backToQuizes(){
        this.$store.commit('quizes/clearQuizState');
        this.$router.push({path:'/pick-quiz'});
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

    .frame__finish{
        margin-top:45px;
    }
    .frame__intro, .frame__finish{
        text-align:center;
        transition: opacity .55s, transform 1s;

        &.out{
            transform: scale(0.2) translateY(-45%);
            opacity:0;
        }

        .intro__header, .intro__description, .finish__header, .finish__subheader{
            margin:0;
        }
        .intro__header{
            font-size:3em;
        }
        .finish__header{
            font-size: 2em;
        }
        .finish__subheader{
            font-size:.89em;
            padding: 5px 20px 0px;
        }
        .finish__table{
            margin-top:15px;
            .table__question{
                -webkit-box-shadow: -1px 10px 50px -10px rgba(0,0,0,0.43);
                -moz-box-shadow: -1px 10px 50px -10px rgba(0,0,0,0.43);
                box-shadow: -1px 10px 50px -10px rgba(0,0,0,0.43);
                margin-bottom: 10px;
                padding:6px 2px;
                background: rgb(255,255,255);
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15309873949579833) 50%, rgba(255,255,255,0) 100%);

                &.answer--proper{
                    background: rgb(0,255,0);
                    background: linear-gradient(90deg, rgba(0,255,0,.3) 0%, rgba(0,255,0,0.45309873949579833) 50%, rgba(0,255,0,.3) 100%);
                }

                &.answer--bad{
                    background: rgb(255,0,0);
                    background: linear-gradient(90deg, rgba(255,0,0,.3) 0%, rgba(255,0,0,0.45309873949579833) 50%, rgba(255,0,0,.3) 100%);
                }

                span{
                    display:block;
                    &.question{
                        font-size:.92em;
                    }
                    &.answer{
                        font-weight:bold;
                    }
                }
            }

            .table__points{
                color:#fff;
                font-size: 1.35em;
                padding: 15px 0;
                margin-bottom: 5px;
                font-weight:bold;
            }
        }
        .intro__description{
            font-size:1em;
            letter-spacing: 2px;
            padding: 0 20px;
        }
        .intro__icon, .finish__icon{
            max-width:200px;
        }
        .intro__button, .table__btn{
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
        .table__btn{
            margin-top: -5px;
            margin-bottom: 20px;
        }
    }
</style>