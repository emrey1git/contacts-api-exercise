import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../constants/index.js";

export const pagination = (query) => {
    const page = parseInt(query.page, 10) || DEFAULT_PAGE;
    const limit = parseInt(query.limit, 10) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
