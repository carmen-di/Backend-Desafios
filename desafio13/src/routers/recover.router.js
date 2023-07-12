import { Router } from "express"
import { forgotPageController, resetPasswordController, resetPasswordCreateController, resetPasswordEmailController, resetPasswordPageController, sendResetPasswordEmail } from "../controllers/recover.controller.js"
import express from "express"

export const recoverRouter = Router()

recoverRouter.use(express.json())
recoverRouter.use(express.urlencoded({ extended: true }))

recoverRouter.get('/', forgotPageController)

recoverRouter.post('/:key', resetPasswordEmailController)

recoverRouter.get('/:key', resetPasswordPageController)

recoverRouter.post('/create/:key', resetPasswordCreateController)

recoverRouter.post('/', sendResetPasswordEmail)