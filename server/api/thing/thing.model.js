'use strict';


import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  events: String,
  where: String,
  date: { type: Date, default: Date.now },
  status: String,
  info: String
});

export default mongoose.model('Thing', ThingSchema);
