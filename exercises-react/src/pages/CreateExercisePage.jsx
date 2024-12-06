import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation'

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate()

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );

        if (response.status == 201) {
            alert("Successfully created the exercise");
        } else {
            alert("Failed to create exercise, status code = " + response.status);
        }
        navigate('/');
    };

    return (
        <div>
            <Navigation/>
            <h1>Create Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select
                type="string"
                value={unit}
                onChange={e => setUnit(e.target.value)} >
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Create</button>
        </div>
    );
}

export default CreateExercisePage;