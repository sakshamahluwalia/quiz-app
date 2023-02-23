export const quizReducer = (state, action) => {

  switch (action.type) {

    case "NEW_QUIZ_ATTEMPT":
      const userId = action.payload.userId;
      const quizTakenId = action.payload.quizTakenId;
      return { ...state, userId, quizTakenId };

    case "SAVE_ANSWER":
      const answer = action.payload.answer;
      const questionId = action.payload.questionId;

      const key = [questionId];
      state.questionAnswers.set(key, answer)

      return { ...state };

    default:
      return state;
  }
};