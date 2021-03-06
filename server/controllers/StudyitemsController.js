import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { studyitemsService } from '../services/StudyitemsService'



//PUBLIC
export class StudyitemsController extends BaseController {
    constructor() {
        super("api/studyitems")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
            .delete('', this.deleteAll)
    }

    async getAll(req, res, next) {
        try {
            //only gets the locus list of user who is logged in
            let data = await studyitemsService.getAll(req.userInfo.email)
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await studyitemsService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await studyitemsService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await studyitemsService.edit(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await studyitemsService.delete(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }

    async deleteAll(req, res, next) {
        try {
            await studyitemsService.deleteAll(req.userInfo.email)
            return res.send("Deleted all items")
        } catch (error) { next(error) }
    }
}


