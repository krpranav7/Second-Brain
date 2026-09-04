import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
});

tagSchema.index(
  { title: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } }
)

export const tagModel = mongoose.model("Tag", tagSchema);