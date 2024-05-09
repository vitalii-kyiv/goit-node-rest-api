import HttpError from "../helpers/HttpError.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts(); // throw new Error()

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
      // const error = new Error(`Movie with id=${id} not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //     message: `Movie with id=${id} not found`
      // })
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send()

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
