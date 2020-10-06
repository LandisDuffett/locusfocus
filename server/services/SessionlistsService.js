import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class SessionlistsService {
  async getAll(userEmail) {
    return await dbContext.Sessionlists.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Sessionlists.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this session list")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Sessionlists.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Sessionlists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this session list");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Sessionlists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this session list");
    }
  }

}


export const sessionlistsService = new SessionlistsService()