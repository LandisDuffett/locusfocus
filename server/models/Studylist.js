import mongoose from "mongoose"
let Schema = mongoose.Schema
import { dbContext } from "../db/DbContext"

const Studylist = new Schema({
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


Studylist.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

/*CASCADE ON DELETE
Studylist.pre('deleteMany', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    //something like...
    dbContext.Studyitem.deleteMany({ studyListId: this._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})*/

//CASCADE ON DELETE
Studylist.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    dbContext.Studyitem.deleteMany({ studyListId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Studylist