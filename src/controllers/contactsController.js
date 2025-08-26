import Contact from "../models/contact.js";
import { getContactServices } from "../services/contactService.js";
import { sort } from "../utils/sort.js";
import { pagination } from "../utils/pagination.js";
import { parseFilter } from "../utils/filter.js";

// GET /contacts
export const getContact = async (req, res) => {
  try {
    const { page, skip, limit } = pagination(req.query);
    const sortParams = sort(req.query);
    const filter = parseFilter(req.query);

    const contactsData = await getContactServices({
      skip,
      limit,
      sort: sortParams,
      page,
      filter,
    });

    res.json({
      status: 200,
      message: "Contacts başarıyla listelendi",
      ...contactsData, // data ve pagination bilgisi servis tarafından geliyor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({ message: "Contact bulunamadı" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /contacts
export const createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /contacts/:id (tam güncelleme)
export const putContactById = async (req, res) => {
  try {
    const { name, phone, email, address, company, notes, isFavorite } =
      req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ message: "Name, phone ve email zorunludur" });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address, company, notes, isFavorite },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Contact bulunamadı" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /contacts/:id (kısmi güncelleme)
export const patchContactById = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Contact bulunamadı" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Contact bulunamadı" });
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
