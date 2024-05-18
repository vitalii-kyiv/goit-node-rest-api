// import * as usersServices from "../services/authServices.js";

// import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jvt.js";
import { findUser, saveUser, updateUser } from "../services/usersServices.js";

const { JWT_SECRET } = process.env;
console.log("JWT_SECRET_CONT", JWT_SECRET);

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    const user = await findUser({ email });
    console.log("user", user);
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const comparePassword = await compareHash(password, user.password);
    console.log("user.password", user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password invalid");
    }
    const { _id: id } = user;
    const payload = {
      id,
    };
    const token = createToken(payload);
    console.log("token", token);
    await updateUser({ _id: id }, { token });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  try {
    const { _id } = req.user;
    await updateUser({ _id }, { token: "" });
    res.json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};
