export default (context) => {
  context.$fir.auth().onAuthStateChanged(user => {
    if(!user){
      context.store.commit('user/setLogged', false);
      context.redirect('/auth');
    }else{
      context.store.commit('user/setLogged', true);
    }
  })
};