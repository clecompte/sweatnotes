const mongoose = require('mongoose');
const { Schema } = mongoose;
const SetSchema = require('./Set');

const exerciseSchema = new Schema({
  exerciseName: String,
  exerciseType: String,
  quantityUnit: String,
  exertionUnit: String,
  sets: [SetSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  lastUpdated: Date
});

mongoose.model('exercises', exerciseSchema);
