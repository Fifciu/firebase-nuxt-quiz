import Vuex from 'vuex';

export const createStore = () => {
  return new Vuex.Store({
    state: {
      deviceType: "desktop"
      /*
      * large desktop       >= 1405
      * desktop             1100 - 1404
      * tablets-laptops  980 - 1099
      * tablets             768 - 979
      * mobile-small-tablets  481 - 767
      * mobile              320 - 480
      * */
    },
    getters:{
      getDeviceType: state => state.deviceType
    },
    mutations: {
      setDeviceType(state, payload){
        state.deviceType = payload;
      }
    }
  });
};
