import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class StudylistsService {
    async getAll(userEmail) {
        return await dbContext.Studylists.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Studylists.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study list")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Studylists.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Studylists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study list");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Studylists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this study list");
        }
    }

    async deleteStudyitems(id, userEmail) {
        let data = await dbContext.Studyitems.deleteMany({ studyListId: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug.")
        }
        return data;
    }
}

export const studylistsService = new StudylistsService()