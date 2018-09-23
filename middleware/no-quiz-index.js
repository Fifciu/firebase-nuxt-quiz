export default ({store, redirect}) => {
  if(store.getters['quizes/getCurrentQuiz'] == null)
    redirect('/pick-quiz');
};