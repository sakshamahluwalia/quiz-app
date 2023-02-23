import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Pages/Quiz';
import Landing from './Pages/Landing';
import Completion from './Pages/Completion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </Router>
  );
}

export default App;
