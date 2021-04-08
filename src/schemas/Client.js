import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.password;
      return ret;
  }
});

export default mongoose.model('Client', ClientSchema);
