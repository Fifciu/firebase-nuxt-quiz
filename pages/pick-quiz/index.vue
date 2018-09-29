<template>
    <section class="container quiz-picker" :class="{'finished': yetAnimed}">
        <div>
            <h1>Pick quiz</h1>
            <div class="quizes">
                <quiz-picker
                        v-for="(i,index) in quizes"
                        :key="index"
                        :name="i.name"
                        :icon="i.icon"
                        :questions_amount="Object.keys(i.questions).length"
                        @pick="startQuiz(index)"
                        :properAnswears="results !== undefined && results[i.name] !== undefined ? results[i.name] : null"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import quizPicker from '@/components/QuizPicker.vue';

  export default {
    middleware: 'protected',
    async asyncData(context){
      let data = await context.app.$fir.database()
        .ref("quizes")
        .orderByChild("name")
        .once("value");
      data = data.toJSON();

      let results = await context.app.$fir.database()
          .ref('results/' + context.store.getters['user/getUser'].uid)
          .once("value");

      /*
      * someobj
      * {quizname}: {properAnswers}
      * */
      let t = results.toJSON()
      if(t){
        let nr = {};
        for(const [k,v] of Object.entries(t)){
          nr[k] = Object.values(v.answers).filter(v => v == 0).length
        }
        return {
          quizes: data,
          results: nr
        };
      }

      return {
        quizes: data
      };
    },
    data(){
      return {
        yetAnimed: false,
        modal: false,
        currentName: ''
      };
    },
    mounted(){
      this.$store.commit('quizes/clearQuizState');
      this.$store.commit('quizes/setQuizes', this.quizes);
      setTimeout(()=>{
        this.yetAnimed = true;
      }, 600)
    },
    methods:{
      startQuiz(name){
        this.$store.commit('quizes/setCurrentQuiz', name);
        this.$router.push({path: '/quiz'});
      }
    },
    components:{
      quizPicker
    }
  };
</script>

<style lang="scss">
    @import '~assets/global.scss';

    section.container.quiz-picker{
        background:rgba(0,0,0,0);
        display:block;
    }
    .quiz-picker{
        margin-top:0px;
        padding-bottom:30px;
        overflow: hidden;
        height: auto;

        div.quizes{
            width:100%;
            height:100%;
            display:flex;

            flex-wrap:wrap;
        }

        h1{
            text-align: left;
            transition:.7s;
            width: 100%;
            font-size:1.8em;
            margin:0;
            padding: 15px 20px;
            background: rgba(255,255,255,.1);
            -webkit-box-shadow: 0px 10px 35px -6px rgba(0,0,0,0.25);
            -moz-box-shadow: 0px 10px 35px -6px rgba(0,0,0,0.25);
            box-shadow: 0px 10px 35px -6px rgba(0,0,0,0.25);
        }

        &.finished{
            h1{
                transform: translateY(0%);
                justify-content:flex-start;
            }
        }

        @include for-size(tablets){
            div.quizes{
                padding-left:20px;
            }
        }
    }
</style>