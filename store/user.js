export const state = () => ({
  user2: {},
  startedQuiz: false
});

export const getters = {
  isAuthenticated: state => Object.keys(state.user2).length >= 1 && !!state.user2,
  getUser: state => state.user2
};

export const actions = {
  resetUser ({state}) {
    state.user2 = {}
  }
};

export const mutations = {
  setUser (state, user) {
    state.user2 = user;
    //return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
  },
  stanceQuiz(state, stance){
    state.startedQuiz = stance;
  }
};

export const strict = false;