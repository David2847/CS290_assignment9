import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

/**
* Perform request validation on all request properties
*/
function isValidRequest(exercise) {
    let isValid = true;
    // name: must be string with at least one character
    if (typeof exercise.name !== 'string' || exercise.name.length === 0) {
        isValid = false;
    // reps: must be integer > 0
    } else if (!Number.isInteger(exercise.reps) || exercise.reps <= 0) {
        isValid = false;
    // weight: must be integer > 0
    } else if (!Number.isInteger(exercise.weight) || exercise.weight <= 0) {
        isValid = false;
    // unit: must be string 'lbs' or 'kgs'
    } else if (typeof exercise.unit !== 'string' || !(exercise.unit === 'lbs' || exercise.unit === 'kgs')) {
        isValid = false;
    // date: must be string in MM-DD-YY format, all three must be 2-digit integers
    } else if (!isDateValid(exercise.date)) {
        isValid = false;
    }
    return isValid;
}

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = req.body;
    const validRequest = isValidRequest(exercise);

    if (validRequest) {
        const createdExercise = await exercises.createEntry(exercise.name, exercise.reps, exercise.weight, exercise.unit, exercise.date);
        res.status(201).json(createdExercise);
    } else {
        const responseObject = { Error: "Invalid request"};
        res.status(400).json(responseObject);
    }
}))

app.get('/exercises', asyncHandler(async (req, res) => {
    const query = req.query;
    const responseArray = await exercises.findExercises(query);
    res.status(200).json(responseArray);
}))

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const responseArray = await exercises.findExercises({_id: req.params.id});
    if (responseArray.length === 0) {
        let responseObject = {"Error": "Not found"};
        res.status(404).json(responseObject);
    } else {
        let responseObject = responseArray[0];
        res.status(200).json(responseObject);
    }
}))

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const exerciseInfo = req.body // object with stuff to update

    if (isValidRequest(exerciseInfo)) {
        const filter = {_id: req.params.id};
        const responseArray = await exercises.updateExercise(filter, exerciseInfo);
        if (responseArray.length === 0) {
            let responseObject = {"Error": "Not found"};
            res.status(404).json(responseObject);
        } else {
            let responseObject = responseArray[0];
            res.status(200).json(responseObject);
        }
    } else {
        const responseObject = { Error: "Invalid request"};
        res.status(400).json(responseObject);
    }
}))

app.delete('/exercises', asyncHandler(async (req, res) => {
    const filter = req.query;
    const deletedCount = await exercises.deleteByQuery(filter);
    let responseObject = {"deletedCount": deletedCount};
    res.status(200).json(responseObject);
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const deletedCount = await exercises.deleteById(req.params.id);
    if (deletedCount === 1) {
        res.setHeader('Content-Type', 'application/json');
        res.status(204).send();
    } else {
        let responseObject = {"Error": "Not found"};
        res.status(404).json(responseObject);
    }
}))