export const parseFilter = (query) => {
  const filter = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.isFavorite) {
    filter.isFavorite = query.isFavorite === "true";
  }

  if (query.email) {
    filter.email = { $regex: query.email, $options: "i" };
  }

  return filter;
};
