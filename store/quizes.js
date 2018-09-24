import firebase from 'firebase';

export const state = () => ({
  quizes: [],
  currentQuiz: null,
  currentQuestion: 0,
  answers: []
});

export const mutations = {
    setQuizes(state, payload){
      state.quizes = payload;
    },
    setCurrentQuiz(state, payload){
      state.currentQuiz = payload;
    },
    nextQuestion(state){
      state.currentQuestion++;
    }
};

export const actions = {
  setAnswer({state}, payload){
    state.answers[payload.key] = payload.value;
    // uid, name
    firebase.database().ref('results/' + payload.uid + "/" + payload.name)
    .set({
      answers: state.answers
    });
  },
  finishQuiz(state, payload){
    firebase.database().ref('results/' + payload.uid + "/" + payload.name)
    .set({
      answers: state.answers,
      finished: true,
      result: Math.round((state.answers.filter(v => v === 0).length / state.currentQuestion)*100)
    });
  }
};

export const getters = {
  getQuizes: state => state.quizes,
  getCurrentQuiz: state => state.currentQuiz
};

export const strict = false;