const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getWorkouts = async(req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getWorkout = async(req, res) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such workout'})
        }

        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(404).json({error: 'No such workout'})
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body
    
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}