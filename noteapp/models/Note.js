import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    pageNumber: { type: Number, required: true, enum: [1, 2, 3] } // page number(1,2,3）
  },
  { timestamps: true } // record the time automatically
);

export default mongoose.model('Note', noteSchema);
