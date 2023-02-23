import { React, useReducer, createContext } from "react";
import { quizReducer } from "./QuizReducer";

export const QuizContext = createContext();

const initialState = {
    quizId: 3,
    userId: null,
    quizTakenId: null,
    questionAnswers: new Map()
};

export const QuizContextProvider = (props) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={[state, dispatch]}>
            {props.children}
        </QuizContext.Provider>
    );
};
