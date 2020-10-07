import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { studylistsService } from '../services/StudylistsService'



//PUBLIC
export class StudylistsController extends BaseController {
  constructor() {
    super("api/studylists")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/studyitems', this.getStudyitemsByStudylistId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete('/:id/studyitems', this.deleteStudyitems)
  }

  async getAll(req, res, next) {
    try {
      //only gets the locus list of user who is logged in
      let data = await studylistsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await studylistsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await studylistsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await studylistsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getStudyitemsByStudylistId(req, res, next) {
    try {
      let data = await studylistsService.getItemsByList(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await studylistsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async deleteStudyitems(req, res, next) {
    try {
      await studylistsService.deleteStudyitems(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


