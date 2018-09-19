import Vuex from 'vuex';

export const state = () => ({
  deviceType: "desktop"
  /*
  * large desktop       >= 1405
  * desktop             1100 - 1404
  * tablets-laptops  980 - 1099
  * tablets             768 - 979
  * mobile-small-tablets  481 - 767
  * mobile              320 - 480
  * */
});

export const getters = {
  getDeviceType: state => state.deviceType
};

export const mutations = {
  setDeviceType(state, payload){
    state.deviceType = payload;
  }
};