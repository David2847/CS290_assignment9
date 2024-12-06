import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
        <header>
          <h1>David's Exercise Tracker</h1>
          <p>This web app can be used to track your exercise over time! Enter a new exercise or delete/edit an old one. </p>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/create-exercise" element={ <CreateExercisePage />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </Router>
        <footer>© 2024 David Jantz</footer>
    </div>
  );
}

export default App;