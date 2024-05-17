// import * as usersServices from "../services/authServices.js";

// import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import { findUser, saveUser } from "../services/usersServices.js";
// import compareHash from "../helpers/compareHash.js";
// import { createToken } from "../helpers/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const newUser = await saveUser(req.body);

    res.status(201).json({
      email: newUser.email,
      subscription: "starter",
    });
  } catch (error) {
    next(error);
  }
};
