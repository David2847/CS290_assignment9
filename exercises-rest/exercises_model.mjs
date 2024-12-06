// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;
const EXERCISE_CLASS = 'Exercise';
let Exercise = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel() {
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true}
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

const createEntry = async (name, reps, weight, unit, date) => { 
    // Call the constructor to create an instance of the model class Movie
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date }); 
    // Call save to persist this object as a document in MongoDB 
    return exercise.save();
  }

async function findExercises(filter) {
    const query = Exercise.find(filter);
    return query.exec();
}

async function updateExercise(filter, updateObject) {
    const result = await Exercise.updateOne(filter, { $set: updateObject});
    // get the updated document
    const query = Exercise.find(filter);
    return query.exec();
}

async function deleteByQuery(filter) {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
  }

export {connect,
        createEntry,
        findExercises,
        updateExercise,
        deleteByQuery,
        deleteById};
