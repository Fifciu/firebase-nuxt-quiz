import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'fuiz',
    paths: [
        "quizes"
    ]
  })(store)
}