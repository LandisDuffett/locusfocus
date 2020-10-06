import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class LocuslistsService {
  async getAll(userEmail) {
    return await dbContext.Locuslists.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async create(rawData) {
    let data = await dbContext.Locuslists.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Locuslists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this locus list");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Locuslists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this locus list");
    }
  }

}


export const locuslistsService = new LocuslistsService()