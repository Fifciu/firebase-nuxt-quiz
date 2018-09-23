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
    },
    setAnswer(state, payload){
      state.asnwers[payload.key] = payload.value;
    }
};

export const getters = {
  getQuizes: state => state.quizes,
  getCurrentQuiz: state => state.currentQuiz
};

export const strict = false;