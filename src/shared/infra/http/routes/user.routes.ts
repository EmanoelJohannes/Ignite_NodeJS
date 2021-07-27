import { Router } from "express";

import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

import { CreateUserController } from "../../../../modules/accounts/usecases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

// Patch é quando se quer alterar apenas uma informacao
usersRoutes.patch("/avatar", ensureAuthenticate ,uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export {usersRoutes}