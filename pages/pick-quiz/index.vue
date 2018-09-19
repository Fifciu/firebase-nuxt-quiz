<template>
    <section class="container quiz-picker" :class="{'finished': yetAnimed}">
        <cmp-starting-modal :name="currentName" v-if="modal"/>
        <div>
            <h1>Pick quiz</h1>
            <quiz-picker
                    v-for="(i,index) in quizes"
                    :key="index"
                    :name="i.name"
                    :icon="i.icon"
                    :questions_amount="Object.keys(i.questions).length"
                    @pick="(name) => { currentName = name; modal = true }"
            />
            <!--<quiz-picker-->
                    <!--v-for="(i,index) in quizes"-->
                    <!--:key="index+5"-->
                    <!--:name="i.name"-->
                    <!--:icon="i.icon"-->
                    <!--:questions_amount="Object.keys(i.questions).length"-->
                    <!--:properAnswears="3"-->
            <!--/>-->
            <!--<quiz-picker-->
                    <!--v-for="(i,index) in quizes"-->
                    <!--:key="index+10"-->
                    <!--:name="i.name"-->
                    <!--:icon="i.icon"-->
                    <!--:questions_amount="Object.keys(i.questions).length"-->
            <!--/>-->
        </div>
    </section>
</template>

<script>
    import quizPicker from '@/components/QuizPicker.vue';
    import cmpStartingModal from '@/components/StartingModal';

  export default {
    middleware: 'protected',
    async asyncData(context){
      let data = await context.app.$fir.database()
        .ref("quizes")
        .orderByChild("name")
        .once("value");
      data = data.toJSON();
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
      this.$store.commit('quizes/setQuizes', this.quizes);
      setTimeout(()=>{
        this.yetAnimed = true;
      }, 600)
    },
    components:{
      quizPicker,
      cmpStartingModal
    }
  };
</script>

<style lang="scss">
    section.container.quiz-picker{
        background:rgba(0,0,0,0);
        display:block;
    }
    .quiz-picker{
        > div{
            display:flex;
            flex-wrap:wrap;
            justify-content: center;
        }
        h1{
            transform:translateY(-100%);
            transition:.7s;
            width: 100%;
            font-size:2em;
            text-align:center;
            margin:0;
            background: #222;
            padding: 15px 0;
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
    }
</style>