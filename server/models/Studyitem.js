import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Studyitem = new Schema({
    title: { type: String, required: true },
    imgURL: { type: Object, required: false },
    creatorEmail: { type: String, required: true },
    studyListId: { type: ObjectId, ref: 'Studylist', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


Studyitem.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Studyitem