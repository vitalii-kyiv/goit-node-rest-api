import express from "express";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  changeUserSubscription,
  getCurrent,
  signin,
  signout,
  signup,
} from "../controllers/usersControllers.js";
import {
  registerUserSchema,
  signinUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registerUserSchema),
  signup
);
usersRouter.post("/login", isEmptyBody, validateBody(signinUserSchema), signin);
usersRouter.post("/logout", authenticate, signout);
usersRouter.post("/current", authenticate, getCurrent);
usersRouter.post(
  "/",
  authenticate,
  validateBody(subscriptionUserSchema),
  changeUserSubscription
);

export default usersRouter;
