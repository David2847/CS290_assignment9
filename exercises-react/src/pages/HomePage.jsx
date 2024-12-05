import { Link } from 'react-router-dom';
import MovieCollection from '../components/MovieCollection';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setMovieToEdit }) {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const loadMovies= async () => {
        const response = await fetch('/movies');
        const data = await response.json();
        setMovies(data);
    }

    useEffect( () => {
        loadMovies();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/movies/${_id}`,
            {method: 'DELETE'}
        );
        if (response.status === 204) {
            setMovies(movies.filter( m => m._id !== _id));
        } else {
            alert(`Failed to delete the movie with _id = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = async (movie) => {
        // console.log("onedit was called with " + movie.title);
        setMovieToEdit(movie);
        navigate('/edit-movie');
    }

    return (
        <>
            <h2>List of Movies</h2>
            <MovieCollection movies={movies} onDelete={onDelete} onEdit={onEdit}></MovieCollection>
            <Link to="/add-movie">Add a movie</Link>
        </>
    );
}

export default HomePage;