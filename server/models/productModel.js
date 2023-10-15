import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  value: Number,
  price: Number,
  category: String,
  description: String,
  rating: Number,
  numInStock: Number,
  img: String,
  numReviews: { type: [String], default: [] },
  isSlider: Boolean,
  reviews: [
    {
      user: { type: String, required: true },
      title: { type: String },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
      timestamp: { type: Date },
    },
  ],
});

export default mongoose.model('Product', productSchema);
