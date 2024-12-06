import '../App.css';

function ExerciseItem({ exercise, onDelete, onEdit }) {

    return (
        <div className="collection-item">
            <h3>{exercise.name}</h3>
            <p>{exercise.reps}, {exercise.unit}, {exercise.date}, {exercise._id}</p>
            <p>
                <a href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}}>Edit</a>&nbsp;
                <a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}>Delete </a>
            </p>
        </div>
    );
}

export default ExerciseItem;