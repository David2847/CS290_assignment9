import MovieItem from './MovieItem';

function MovieCollection({ movies, onDelete, onEdit}) {
    return (
        <div className="collection-container">
            {movies.map((movie, i) => <MovieItem movie={movie} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}/>)}
        </div>

    );
}

export default MovieCollection;