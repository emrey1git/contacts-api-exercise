import { SORT_FIELDS, SORT_ORDER } from "../constants/index.js";

export const sort = (query) => {
  const sortBy = SORT_FIELDS.includes(query.sortBy)
    ? query.sortBy
    : "createdAt";
  const order = SORT_ORDER.includes(query.order) ? query.order : "asc";
  const sortValue = order === "asc" ? 1 : -1;
  
  return { [sortBy]: sortValue };
};
