import '../App.css';

function MovieItem({ movie, onDelete, onEdit }) {

    return (
        <div className="collection-item">
            <h3>{movie.title}</h3>
            <p>{movie.year}, {movie.language}</p>
            <p>
                <a href="/" onClick={e => {e.preventDefault(); onEdit(movie)}}>Edit</a>&nbsp;
                <a href="/" onClick={e => {e.preventDefault(); onDelete(movie._id)}}>Delete </a>
            </p>
        </div>
    );
}

export default MovieItem;