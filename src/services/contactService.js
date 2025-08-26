import Contact from "../models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContactServices = async ({
  skip,
  limit,
  sort,
  filter,
  page,
}) => {
  const query = filter ? { ...filter } : {};

  const contacts = await Contact.find(query).sort(sort).skip(skip).limit(limit);

  const totalItems = await Contact.countDocuments(query);

  const paginationData = calculatePaginationData({ totalItems, page, limit });

  return {
    data: contacts,
    ...paginationData,
  };
};
