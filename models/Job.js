import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const JobSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: [true]
  },
  id: {
    type: String,
    required: [true]
  },
  company: {
    type: String,
    required: [true]
  },
  company_logo: { type: String, required: [true] },
  company_url: { type: String, required: [true] },
  created_at: {
    type: String,
    required: [true]
  },
  location: {
    type: String,
    required: [true]
  },
  title: {
    type: String,
    required: [true]
  },
  type: {
    type: String,
    required: [true]
  },
  url: {
    type: String,
    required: [true]
  }
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
