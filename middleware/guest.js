import firebase from 'firebase'

export default ({store, redirect}) => {
  //console.log(!process.server);
  if((store.getters['user/isAuthenticated'] && firebase.auth().currentUser)){
    redirect('/pick-quiz');
  }
};