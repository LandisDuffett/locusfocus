import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { locuslistsService } from '../services/LocuslistsService'



//PUBLIC
export class LocuslistsController extends BaseController {
  constructor() {
    super("api/locuslists")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .post("/:id/items", this.addLocus)
  }


  async getAll(req, res, next) {
    try {
      //only gets the locus list of user who is logged in
      let data = await locuslistsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await locuslistsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async addLocus(req, res, next) {
    try {
      let locus = await locuslistsService.addLocus(req.params.id, req.body);
      if (locus) {
        return res.send(locus);
      }
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await locuslistsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await locuslistsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


