import firebase from 'firebase'

export default ({redirect, store}) => {
  if((process.server && firebase.apps.length) || !store.getters['user/isAuthenticated']){
    redirect('/auth');
  }
};