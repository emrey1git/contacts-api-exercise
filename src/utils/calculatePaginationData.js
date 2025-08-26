export const calculatePaginationData = ({ totalItems, page, limit }) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    page,
    perPage: limit,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
