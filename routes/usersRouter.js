import express from "express";
// import {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
//   updateStatusContact,
// } from "../controllers/contactsControllers.js";
// import validateBody from "../middlewares/validateBody.js";
// import {
//   createContactSchema,
//   updateContactSchema,
//   updateContactStatusSchema,
// } from "../schemas/contactsSchemas.js";
// import isValidId from "../middlewares/isValidId.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import { signin, signout, signup } from "../controllers/usersControllers.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registerUserSchema),
  signup
);
usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(registerUserSchema),
  signin
);

usersRouter.post("/logout", authenticate, signout);
// usersRouter.post("/users/current", getAllContacts);

// contactsRouter.get("/:id", isValidId, getOneContact);

// contactsRouter.delete("/:id", isValidId, deleteContact);

// contactsRouter.post("/", validateBody(createContactSchema), createContact);

// contactsRouter.put(
//   "/:id",
//   isEmptyBody,
//   isValidId,
//   validateBody(updateContactSchema),
//   updateContact
// );

// contactsRouter.patch(
//   "/:id/favorite",
//   validateBody(updateContactStatusSchema),
//   isValidId,
//   updateStatusContact
// );

export default usersRouter;
