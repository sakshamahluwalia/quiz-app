import "../App.css"
import axios from "axios";
import React, { useContext, useEffect } from 'react';

import { QuizContext } from '../Context/Quiz/QuizContext';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

const Completion = () => {

    const [state, dispatch] = useContext(QuizContext);

    useEffect(() => {
        const userId = state.userId
        const quizTakenId = state.quizTakenId
        const questionAnswers = []
        state.questionAnswers.forEach(function (value, key) {
            questionAnswers.push({questionId: key[0], answer: value});
        })
        axios.post("/api/answer", { userId, quizTakenId, questionAnswers }).then((response) => {
          axios.put("/api/quizTaken/endTime", {quizTakenId: state.quizTakenId})
        })
        // put request to update end time for quiz
    }, [])

    return (
        <Container className='centerParent'>
          <Alert show={true} variant="success" className='centerChild'>
            <Alert.Heading>Thanks for participating</Alert.Heading>
            <p>
              Your responses have been saved.
            </p>
          </Alert>
        </Container>
      );
}

export default Completion