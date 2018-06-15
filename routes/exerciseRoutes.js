const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Exercise = mongoose.model('exercises');

module.exports = app => {
  app.get('/api/exercises', requireLogin, async (req, res) => {
    try {
      let exercises = await Exercise.find({ _user: req.user.id });

      res.send(exercises);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/exercise/:id', requireLogin, async (req, res) => {
    try {
      let exercise = await Exercise.find({ _id: req.params.id });
      res.send(exercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/exercises', requireLogin, async (req, res) => {
    let { exerciseName, exerciseType, quantityUnit, exertionUnit, sets } = req.body;

    const sortedSets = sets.sort((b, a) => {
      if (a.quantity < b.quantity) {
        return -1;
      }
      if (a.quantity > b.quantity) {
        return 1;
      }
    });

    try {
      let exercise = new Exercise({
        exerciseName,
        exerciseType,
        quantityUnit,
        exertionUnit,
        sets: sortedSets.map(set => ({ quantity: set.quantity, exertion: set.exertion })),
        _user: req.user.id,
        dateModified: Date.now()
      });

      await exercise.save();
      const user = await req.user.save();
      res.send(user);
    } catch(err) {
      res.status(422).send(err);
      console.log(err);
    }
  });

  app.put('/api/exercises', requireLogin, async (req, res) => {
    let { direction, exercise, set } = req.body;
    let change = (direction === 'increase' ? 2.5 : -2.5);

    try {
      let updatedExercise = await Exercise.findOneAndUpdate(
        {
          _id: exercise._id,
          sets: { $elemMatch: { _id: set._id } }
        },
        {
          $inc: { 'sets.$.exertion': change }
        },
        { new: true }
      );

      res.send(updatedExercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/exercises/:id', requireLogin, async (req, res) => {
    try {
      let exercise = await Exercise.findOneAndRemove({ _id: req.params.id });
      res.send(exercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/exercises/duplicate/:id', requireLogin, async (req, res) => {
    try {
      let exercise = await Exercise.findOne({ _id: req.params.id });
      exercise._id = mongoose.Types.ObjectId();
      duplicateExercise = new Exercise(exercise.toObject());
      duplicateExercise.save();
      res.send(duplicateExercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put('/api/exercises/:id', requireLogin, async (req, res) => {
    let { newExerciseTitle, newExerciseType } = req.body;

    try {
      let exercise = await Exercise.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            'exerciseName': newExerciseTitle,
            'exerciseType': newExerciseType
          }
        }
      );

      res.send(exercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put('/api/exercises/set/:id', requireLogin, async (req, res) => {
    let { newSetQuantity, newSetExertion } = req.body;

    try {
      let updatedExercise = await Exercise.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            sets: {
              $each: [{
                quantity: newSetQuantity,
                exertion: newSetExertion
              }],
              $sort: {
                quantity: -1
              }
            }
          },
        },
        { new: true }
      );

      res.send(updatedExercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });
}