import Vuex from 'vuex';

export const state = () => ({
  quizes: [],
  currentQuiz: null
});

export const mutations = {
      setQuizes(state, payload){
      state.quizes = payload;
    },
    setCurrentQuiz(state, payload){
      state.currentQuiz = payload;
    }
};

export const getters = {
  getQuizes: state => state.quizes,
  getCurrentQuiz: state => state.currentQuiz
};