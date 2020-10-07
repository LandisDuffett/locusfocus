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

  async addLocus(id, body) {
    return await dbContext.Locuslists.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { items: body } },
      { new: true }
    );
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Locuslists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this locuslist");
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