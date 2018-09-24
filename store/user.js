export const state = () => ({
  user: {},
  startedQuiz: false
});

export const getters = {
  isAuthenticated: state => Object.keys(state.user).length >= 1 && !!state.user,
  getUser: state => state.user,
  getUid: state => state.user.uid
};

export const actions = {
  resetUser ({state}) {
    state.user = {}
  }
};

export const mutations = {
  setUser (state, user) {
    state.user = user;
    //return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
  },
  stanceQuiz(state, stance){
    state.startedQuiz = stance;
  }
};

export const strict = false;