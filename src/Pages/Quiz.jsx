import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react'

import { QuizContext } from "../Context/Quiz/QuizContext";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const calculateProgress = (index, total) => {
    return ((index / total) * 100).toFixed(0);
}

const Quiz = () => {

    const navigate = useNavigate();
    const [state, dispatch] = useContext(QuizContext);

    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState('');
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)

    useEffect(() => {
        axios.get(`/api/quiz/${state.quizId}`).then((response) => {
            if (response.status === 200) {
                setQuiz(response.data.quiz)
                axios.get(`/api/question/${state.quizId}`).then((response) => {
                    setQuestions(response.data.questions)
                })
            } else {
                resetState()
            }
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (currentQuestion + 1 === questions.length) {
                navigate('/completion');
            }
            setCurrentQuestion(currentQuestion + 1)
        }, 1000 * 3 * 60)
    }, [currentQuestion])

    const resetState = () => {
        setAnswer('')
        setQuiz(null)
        setQuestions([])
        setCurrentQuestion(0)
    }

    const handleClick = () => {
        saveAnswer(currentQuestion, answer);
        if (currentQuestion + 1 === questions.length) {
            navigate('/completion');
        }
        if (answer.length >= 1) {
            setAnswer('')
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const saveAnswer = (currentQuestion, answer) => {
        const questionObject = questions.at(currentQuestion)
        dispatch({
            type: "SAVE_ANSWER",
            payload: {
                questionId: questionObject.idQuestions,
                answer
            }
        });
    }

    return (
        <>
            {questions.length > 0 ?
                (<Modal centered show={true}>
                    <Modal.Header>
                        <Modal.Title style={{ minWidth: '100%' }}>
                            {quiz && quiz.title}
                            <ProgressBar
                                striped
                                animated
                                now={calculateProgress(currentQuestion, questions.length)}
                                label={`${calculateProgress(currentQuestion, questions.length)}%`}
                            />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>{questions.at(currentQuestion).question}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={answer}
                                    onChange={(event) => setAnswer(event.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClick} disabled={answer.length <= 0}>
                            {currentQuestion + 1 === questions.length ? 'Submit' : 'Next'}
                        </Button>
                    </Modal.Footer>
                </Modal>) :
                (<Container>
                    <p>Sorry there are no questions in this quiz</p>
                </Container>)}
        </>

    )
}

export default Quiz