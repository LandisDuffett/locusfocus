import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class StudyitemsService {
    async getAll(userEmail) {
        return await dbContext.Studyitems.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Studyitems.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study item")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Studyitems.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Studyitems.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study item");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Studyitems.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study item");
        }
    }

    async deleteAll(userEmail) {
        let data = await dbContext.Studyitems.deleteMany({ creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this locus list");
        }
    }

}


export const studyitemsService = new StudyitemsService()