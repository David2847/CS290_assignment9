import '../App.css';
import EditOrRemove from './EditOrRemove';

function ExerciseRow({ exercise, onDelete, onEdit }) {

    return (
        <tr key={exercise.name}>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><EditOrRemove exercise={exercise} onDelete={onDelete} onEdit={onEdit}/></td>
        </tr>
    );
}

export default ExerciseRow;