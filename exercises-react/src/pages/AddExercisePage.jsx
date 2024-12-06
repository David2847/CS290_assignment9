import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const temp = {
        "name": "Deadlift",
        "reps": 1000,
        "weight": 30,
        "unit": "kgs",
        "date": "07-18-24"
    }


    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );

        if (response.status == 201) {
            alert("Successfully added the exercise");
        } else {
            alert("Failed to add exercise, status code = " + response.status);
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="name"
                placeholder="Enter name here"
                value={title}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="weight"
                value={year}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <input
                type="unit"
                placeholder="Enter unit here"
                value={language}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="date"
                placeholder="Enter date here"
                value={language}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;