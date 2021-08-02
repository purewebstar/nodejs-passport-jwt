/** importing dependencies */
import express from 'express'
import passport from 'passport'

/** importing controllers */
import {createUser, readUser, readUserInfo} from '../controllers/api.controller.js'

const router = express.Router()

//GET HTTP
router.get('/read-user-info', passport.authenticate('jwt', {session: false}), readUserInfo)

// POST HTTP
router.post('/create-user', createUser)
router.post('/read-user', readUser)

export default router