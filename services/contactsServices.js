import { nanoid } from "nanoid";
import Contact from "../models/Contacts.js";

export const listContactsService = (search = {}) => {
  try {
    const { filter = {}, fields = "", settings = {} } = search;
    return Contact.find(filter, fields, settings).populate(
      "owner",
      "username email"
    );
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
};

export const countContacts = (filter) => Contact.countDocuments(filter);

export const getContactService = async (filter) => {
  const result = await Contact.findOne(filter);
  return result;
};

export const removeContactService = async (filter) => {
  return Contact.findByIdAndDelete(filter);
};

export const addContactService = async (data) => {
  return Contact.create(data);
};

export const updateContactService = async (filter, data) => {
  return Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
  });
};

export const updateStatusContactService = async (filter, data) => {
  return Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
  });
};
