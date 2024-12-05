import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import { useState } from 'react';

function App() {

  const [movieToEdit, setMovieToEdit] = useState();

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage setMovieToEdit={setMovieToEdit}/>}></Route>
            <Route path="/add-movie" element={ <AddMoviePage />}></Route>
            <Route path="/edit-movie" element={ <EditMoviePage movieToEdit={movieToEdit}/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;