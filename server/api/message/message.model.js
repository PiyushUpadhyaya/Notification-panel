'use strict';

import mongoose from 'mongoose';

var MessageSchema = new mongoose.Schema({
  name: String,
  info: String,
});

export default mongoose.model('Message', MessageSchema);
