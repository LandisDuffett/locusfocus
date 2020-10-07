import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Sessionlist = new Schema(
  {
    title: { type: String, required: true },
    pairs: { type: Object, required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Sessionlist.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Sessionlist;
