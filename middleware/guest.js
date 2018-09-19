export default (context) => {
  context.$fir.auth().onAuthStateChanged(user => {
    if(user){
      context.store.commit('user/setLogged', true);
      context.redirect('/pick-quiz');
    }else{
      context.store.commit('user/setLogged', false);
    }
  })
};