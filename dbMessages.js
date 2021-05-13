import mongoose from 'mongoose';

const liveChatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model('messageContent', liveChatSchema);
