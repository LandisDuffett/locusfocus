import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class LociService {
  async getAll(userEmail) {
    return await dbContext.Loci.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async create(rawData) {
    let data = await dbContext.Loci.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Loci.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this locuslist");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Loci.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this locus list");
    }
  }

}


export const lociService = new LociService()