import { nanoid } from "nanoid";
import Contact from "../models/Contacts.js";

export const listContacts = async (search = {}) => {
  const { filter = {} } = search;
  return Contact.find(filter);
};

export const getContactById = async (_id) => {
  const result = await Contact.findById(_id);
  return result;
};

export const removeContact = async (_id) => {
  return Contact.findByIdAndDelete(_id);
};

export const addContact = async (data) => {
  return Contact.create(data);
  // return data;
};

export const updateContactByID = async (_id, data) => {
  return Contact.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
};
