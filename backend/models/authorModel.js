import mongoose from 'mongoose';

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model('Author', authorSchema);

export default Author;