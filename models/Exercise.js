const mongoose = require('mongoose');
const { Schema } = mongoose;
const SetSchema = require('./Set');

const exerciseSchema = new Schema({
  exercise_name: String,
  exercise_type: String,
  quantity_unit: String,
  exertion_unit: String,
  set: [SetSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  lastUpdated: Date
});

mongoose.model('exercises', exerciseSchema);
