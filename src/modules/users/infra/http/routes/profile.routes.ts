import {Router} from 'express'
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'
import { Segments, Joi, celebrate } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)
profileRouter.get('/', profileController.show)
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}), profileController.update)


export default profileRouter
