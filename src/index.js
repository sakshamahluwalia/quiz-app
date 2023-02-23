import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuizContextProvider } from './Context/Quiz/QuizContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizContextProvider>
    <App />
  </QuizContextProvider>
);