export const state = () => ({
  isLogged: false
});

export const getters = {
  getLogged: state => state.isLogged
};

export const mutations = {
  setLogged(state, payload){
    state.isLogged = payload;
  }
};