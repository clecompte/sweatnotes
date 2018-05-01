const mongoose = require('mongoose');
const { Schema } = mongoose;

const setSchema = new Schema({
  quantity: Number,
  exertion: Number
});

module.exports = setSchema;
