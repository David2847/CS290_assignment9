import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exercises, onDelete, onEdit}) {
    return (
        <div className="exercise-table">
            {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}/>)}
        </div>

    );
}

export default ExerciseTable;