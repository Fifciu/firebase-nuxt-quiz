import firebase from 'firebase';

export default ({store, redirect}) => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        return resolve(store.commit('user/setUser', user));
      }
      return resolve();
    });
  });
};