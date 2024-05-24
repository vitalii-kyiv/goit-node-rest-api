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
      user: {
        email: newUser.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    const payload = {
      id,
    };
    const token = createToken(payload);
    await updateUser({ _id: id }, { token });
    res.json({
      token,
      user: { email, subscription: "starter" },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await updateUser({ _id }, { token: "" });
    res.status(204).json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const changeUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id, email } = req.user;
    await updateUser({ _id }, { subscription });
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};
