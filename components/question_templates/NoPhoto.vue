<template>
    <div class="qTemplate--no-photo">
        <h2 class="no-photo__question">{{question.text}}</h2>
        <div class="answers">
            <cmp-answer
                    v-for="(i,index) in shuffledAnswers"
                    :answerText="i.toString()"
                    :answerNumber="index"
                    :key="index"
                    @choose="picked(index)"
            />
        </div>
    </div>
</template>

<script>
    import cmpAnswer from '@/components/Answer.vue';
  export default {
    name: 'QuestionTemplate_NoPhoto',
    props:{
      question:{
        type: Object,
        required: true
      }
    },
    data(){
      return {
        shuffledAnswers: [],
        properId: 0
      };
    },
    mounted(){
      const properAnswer = this.question.answears[0];
      this.shuffledAnswers = this.shuffle(Object.values(this.question.answears));
      this.properId = this.shuffledAnswers.findIndex(v => v === properAnswer);
    },
    methods:{
      shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      },
      picked(index){
        const realId = Object.values(this.question.answears)
            .findIndex(v => v === this.shuffledAnswers[index]);

        this.$emit('choose', realId);
      }
    },
    components:{
      cmpAnswer
    }
  };
</script>

<style scoped>
    .qTemplate--no-photo{
        width:90%;
        margin:0 auto;
        padding: 60px 0;
    }

    .no-photo__question{
        font-size: 2em;
    }
</style>