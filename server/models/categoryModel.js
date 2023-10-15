import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: String,
  description: String,
  img: String,
});

export default mongoose.model('Category', categorySchema);
