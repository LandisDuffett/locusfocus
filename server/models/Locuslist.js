import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Locus = new Schema(
  {
    description: { type: String, required: true },
    image: { type: String, required: false },
    locusListId: { type: String, required: true },
  }
)

const Locuslist = new Schema({
  items: [Locus],
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Locuslist.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Locuslist