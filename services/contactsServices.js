import { nanoid } from "nanoid";
import Contact from "../models/Contacts.js";

export const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log("Contacts fetched: ", contacts);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
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
};

export const updateContactByID = async (_id, data) => {
  return Contact.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
};

export const updateStatusContactById = async (_id, body) => {
  return Contact.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
};
