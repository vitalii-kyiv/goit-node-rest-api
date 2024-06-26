import express from "express";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  changeUserAvatar,
  changeUserSubscription,
  getCurrent,
  resendVerifyEmail,
  signin,
  signout,
  signup,
  verifyEmail,
} from "../controllers/usersControllers.js";
import {
  registerUserSchema,
  resendVerifyUserSchema,
  signinUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import checkFileExists from "../middlewares/checkFileExists .js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registerUserSchema),
  signup
);
usersRouter.post("/login", isEmptyBody, validateBody(signinUserSchema), signin);
usersRouter.post("/logout", authenticate, signout);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post(
  "/",
  authenticate,
  validateBody(subscriptionUserSchema),
  changeUserSubscription
);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  checkFileExists,
  changeUserAvatar
);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(resendVerifyUserSchema),
  resendVerifyEmail
);

export default usersRouter;
