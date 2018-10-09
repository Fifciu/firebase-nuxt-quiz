<template>
        <tmp-finisher
            :name="name"
            :icon="icon"
            :results="quizresult"
            :percent="percent"
        />
</template>

<script>
    import tmpFinisher from '@/components/question_templates/Finisher.vue'

  export default {
    name: 'Quizresults',
    middleware: 'protected',
    components:{
      tmpFinisher
    },
    validate({params, store}){
      if(Object.values(store.getters['quizes/getQuizes']).filter(v => v.name === params.quizname).length == 1){
        return true
      }
      return false;
    },
    async asyncData(context){
      // It was validated so time to get it from firebase
      const quizname = context.params.quizname;
      let results = await context.app.$fir.database()
      .ref('results/' + context.store.getters['user/getUser'].uid + "/" + quizname)
      .once("value");

      const t = results.toJSON();
      if(!t){
        context.redirect("/pick-quiz")
      }else{
        const arr = Object.values(t.answers)
        const quizObj = Object.values(context.store.getters['quizes/getQuizes']).filter(v => v.name === quizname)[0];

        const results = [];
        for(let i = 0; i < arr.length; i++){
          results.push({
            question: quizObj.questions[i].text,
            answer: quizObj.questions[i].answears[arr[i]],
            isProper: arr[i] == 0
          });
        }

        const percent = Math.round((arr.filter(v => v == 0).length / arr.length)*10000)/100;

        return {
          quizresult: results,
          percent,
          icon: quizObj.icon,
          name: quizname
        }
      }
    }
  };
</script>

<style scoped>

</style>
