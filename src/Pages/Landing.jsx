import "../App.css"
import axios from "axios";
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { QuizContext } from "../Context/Quiz/QuizContext";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Landing = () => {

    const navigate = useNavigate();
    const [state, dispatch] = useContext(QuizContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {

        let newUserId = null;
        let newQuizTakenId = null;
        axios.post("/api/user/", { username, password }).then((response) => {
            if (response.status === 200) {
                newUserId = response.data?.userId
                axios.post("/api/quizTaken/", {quizId: state.quizId, userId: newUserId}).then((response) => {
                    if (response.status === 200) {
                        newQuizTakenId = response.data.quizTakenId
                        dispatch({
                            type: "NEW_QUIZ_ATTEMPT",
                            payload: {
                                userId: newUserId,
                                quizTakenId: newQuizTakenId
                            },
                        });
                        navigate('/quiz');
                    }
                })
            }
        })
    }

    return (

        <Container className='landingPageWrapper centerParent'>
            <Container className='landingPageContainer centerChild'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleClick}>
                    Submit
                </Button>
            </Container>
        </Container>
    );

}

export default Landing